import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Orderitem } from "../models/orderitems"
//import { entityManager } from "../configs/db.sql"
@Entity()
export class GroceryItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    item_name: String

    @Column()
    price: number

    @Column()
    quantity: number
}