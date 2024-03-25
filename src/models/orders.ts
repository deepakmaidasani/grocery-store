import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Double, OneToMany } from "typeorm"
import {Orderitem} from "../models/orderitems"
import { Date } from "mongoose"
//import { entityManager } from "../configs/db.sql"
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number

    @Column()
    user_id: number
    
    @Column()
    order_date: string

    @Column()
    total_price: number
}