import express, { Request, Response } from "express";
import { entityManager } from "../configs/db.sql";

export async function createItem(req: Request, res: Response) {
    let isSuccess: boolean, status: number;
    try {
        let userdata = req.body.user;
        delete req.body.user;

        if (!userdata.isAdmin) {
            isSuccess = false;
            status = 401;
            return res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Access Denied!",
            });
        }
        let data = req.body;
        const query = `
    INSERT INTO grocery_item (item_name, price, quantity)
    VALUES (?, ?, ?)`;
        await entityManager.query(query, [data.item, data.price, data.quantity]);
        status = 201;
        isSuccess = true;
        res.status(status).json({
            isSuccess: isSuccess,
            data: data,
            message: "item added successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "some error occurred",
        })
    }
}

export async function getItemByName(req: Request, res: Response) {
    try {
        let item = req.query.item;
        const query = `
    SELECT * FROM grocery_item WHERE item_name = ?`;
        let data = await entityManager.query(query, [item]);
        if (data.length) {
            res.json({
                data: data,
                message: "item fetched successfully"
            })
        }
        else {
            res.json({
                message: "No item found for the given name"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "some error occurred",
        })
    }
}

export async function getItems(req: Request, res: Response) {
    try {
        const query = `
    SELECT item_name, price FROM grocery_item where quantity > 0`;
        let data = await entityManager.query(query);
        if (data.length) {
            res.json({
                data: data,
                message: "items fetched successfully"
            })
        }
        else {
            res.json({
                message: "No items found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "some error occurred",
        })
    }
}

export async function getItemById(req: Request, res: Response) {
    try {
        let itemid = +req.params.id
        const query = `
    SELECT * FROM grocery_item WHERE id = ?`;
        let data = await entityManager.query(query, [itemid]);
        if (data.length) {
            res.json({
                data: data,
                message: "item fetched successfully"
            })
        }
        else {
            res.json({
                message: "No item found for the given id"
            })
        }

    }
    catch (err) {
        res.json({
            message: "some error occurred",
        })
    }
}

export async function updateItem(req: Request, res: Response) {
    let isSuccess: boolean, status: number;
    let userdata = req.body.user;
    delete req.body.user;

    if (!userdata.isAdmin) {
        isSuccess = false;
        status = 401;
        return res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message: "Access Denied!",
        });
    }
    const requestbody: JSON = req.body;
    const itemid: number = +req.params.id;
    const keys = Object.keys(requestbody);
    const values = Object.values(requestbody);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const query = `UPDATE grocery_item SET ${setClause} where id = ?`;
    try {
        let data = await entityManager.query(query, [...values, itemid]);
        if (data.affectedRows) {
            status = 201;
            isSuccess = true;
            res.status(status).json({
                isSuccess: isSuccess,
                message: "item updated successfully"
            })
        }
        else {
            status = 404;
            isSuccess = false;
            res.status(status).json({
                isSuccess: false,
                message: "No item found to update for the given id"
            })
        }

    }
    catch (err) {
        isSuccess = false;
        res.status(500).json({
            isSuccess: isSuccess,
            message: "Some error occured, please try again later",
        })
    }
}

export async function deleteItem(req: Request, res: Response) {
    let isSuccess: boolean, status: number;
    let userdata = req.body.user;
    delete req.body.user;

    if (!userdata.isAdmin) {
        isSuccess = false;
        status = 401;
        return res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message: "Access Denied!",
        });
    }
    const itemid: number = +req.params.id;
    const query: string = `DELETE FROM grocery_item where id = ?`;
    try {
        const data = await entityManager.query(query, [itemid]);
        if (data.affectedRows) {
            isSuccess = true;
            status = 204;
            res.status(status).json({
                isSuccess: isSuccess,
                message: "item deleted successfully"
            })
        } else {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                message: "item not found"
            })
        }
    }
    catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            message: "Some error occured, please try again later",
        })
    }
}