import express, { Request, Response } from "express";
import { GroceryItem } from "../models/items";
import { User } from "../models/groceryusers";
import { Orderitem } from "../models/orderitems";
import { Order } from "../models/orders";
import { AppDataSource } from "../configs/db.sql";
import { entityManager } from "../configs/db.sql";

export async function makeOrder(req: Request, res: Response) {
    let isSuccess: boolean, status: number;
    try {
        let userdata = req.body.user;
        delete req.body.user;

        let order = req.body;
        let OOSflag = false;
        let orderitems: Orderitem[] = req.body.items;
        let totalAmount = 0.0;

        let orderRepository = AppDataSource.getRepository(Order);
        let newOrder = new Order();
        newOrder.user_id = userdata.userId;

        const orderid = await orderRepository.save(newOrder);
        let bookOrderItems: Orderitem[] = [];
        let updateItemQty: GroceryItem[] = [];
        let itemRepository = AppDataSource.getRepository(GroceryItem);
        for (let i = 0; i < orderitems.length; i++) {
            let orderitem = orderitems[i];

            bookOrderItems[i] = new Orderitem();
            updateItemQty[i] = new GroceryItem();
            bookOrderItems[i].quantity = orderitem.quantity;
            bookOrderItems[i].item_id = orderitem.item_id;
            bookOrderItems[i].order_id = orderid.order_id;


            let itemdetails = await itemRepository.findOneBy({ id: orderitem.item_id })
            let itemprice = itemdetails?.price;
            let itemqty = itemdetails?.quantity;
            if (itemqty && itemqty < orderitem.quantity) {
                OOSflag = true;
                break;
            }
            if (itemprice)
                totalAmount += itemprice * orderitem.quantity;

            if (itemqty) {
                updateItemQty[i].id = orderitem.item_id;
                updateItemQty[i].quantity = itemqty - orderitem.quantity;
            }
        };
        if (OOSflag) {
            const query = `DELETE FROM ORDER WHERE ORDER_ID = ?`;
            await entityManager.query(query, [orderid]);
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Items out of stock",
            });
        }
        else {
            for (let i = 0; i < orderitems.length; i++) {
                let orderItems = AppDataSource.getRepository(Orderitem);
                orderItems.save(bookOrderItems[i]);
                itemRepository.update(updateItemQty[i].id, {
                    quantity: updateItemQty[i].quantity
                })
            }
            await orderRepository.update(orderid, {
                total_price: totalAmount
            });
            isSuccess = true;
            status = 201;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Order booked successfully",
            });
        }
    }
    catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message: "Error occurred while making an order. Please try again later",
        });
    }
}