import express, { Request, Response } from "express";
import { User } from "../models/groceryusers";
import bcrypt from "bcrypt";
import { entityManager } from "../configs/db.sql";
import { AppDataSource } from "../configs/db.sql";
import jwt from "jsonwebtoken";

export async function addUser(req: Request, res: Response) {
    let isSuccess: boolean, status: number;
    let userdata = req.body;
    userdata.password = bcrypt.hashSync(userdata.password, 10);
    let query: string = `INSERT INTO user (username, email, password, is_admin) VALUES (?, ?, ?, ?)`;
    try {
        let data = await entityManager.query(query, [userdata.username, userdata.email, userdata.password, userdata.is_admin]);
        if (data.affectedRows) {
            isSuccess = true;
            status = 201;
            res.json({
                isSuccess: isSuccess,
                status: status,
                message: "user added successfully"
            })
        }
        else {
            isSuccess = false;
            status = 401;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "User can't be added"
            })
        }
    }
    catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message: "Error adding user, please try again later",
        })
    }
}

//Authentication
export async function userlogin(req: Request, res: Response) {
    let isSuccess: boolean, status: number;
    try {
        let username: string = req.body.username;
        let password: string = req.body.password;
        let userRepository = AppDataSource.getRepository(User);
        let userExists = await userRepository.findOneBy({
            username: username
        });
        if (!userExists) {
            isSuccess = false;
            status = 404;
            return res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "User does not exists!",
            });
        }
        if (userExists && bcrypt.compareSync(password, userExists.password)) {
            const USER_ACCESS_KEY = process.env.USER_ACCESS_KEY;
            const token = jwt.sign(
                {
                    userId: userExists.user_id,
                    isAdmin: userExists.is_admin,
                },
                USER_ACCESS_KEY,
                { expiresIn: "1d" }
            );
            isSuccess = true;
            status = 200;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                token: token,
                message: "Authentication Successfull!",
            });
        } else {
            isSuccess = false;
            status = 401;
            return res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Authentication failed! Invalid username or password",
            });
        }
    }
    catch (err) {
        isSuccess = false;
        status = 500;
        return res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message: "Something went wrong, please try again later",
        });
    }
}