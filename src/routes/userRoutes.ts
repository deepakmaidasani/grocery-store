import express, { Request, Response } from "express";
const router = express.Router();
import { addUser, userlogin } from "../controllers/groceryusers";
import { makeOrder } from "../controllers/groceryorders";
import { authenticateToken } from "../middlewares/authenicate";


router.post('/api/signup', addUser)

router.get('/api/login', userlogin)

router.post('/api/order', authenticateToken, makeOrder);

export {
    router as userRouter
}