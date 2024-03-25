import express, { Request, Response } from "express";
const router = express.Router();
import { createItem, getItemById, getItemByName, updateItem, deleteItem, getItems } from "../controllers/groceryItem";
import { authenticateToken } from "../middlewares/authenicate";

router.post('/api/insertitem', authenticateToken, createItem)

router.get('/api/getitem', authenticateToken, getItemByName)

router.get('/api/getItem/:id', authenticateToken, getItemById)

router.patch('/api/updateitem/:id', authenticateToken, updateItem)

router.delete('/api/deleteitem/:id', authenticateToken, deleteItem)

router.get('/api/viewitems', authenticateToken, getItems)

export {
    router as itemRouter
}