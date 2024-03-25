import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import {Order} from "../models/orders"
//import { entityManager } from "../configs/db.sql"
@Entity()
export class Orderitem {
    @PrimaryGeneratedColumn()
    order_item_id: number

    @Column()
    item_id: number

    @Column()
    order_id: number

    @Column()
    quantity: number
}