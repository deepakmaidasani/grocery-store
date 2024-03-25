import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
//import { entityManager } from "../configs/db.sql"
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    is_admin: number
}