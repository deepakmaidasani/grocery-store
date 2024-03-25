import express, { Request, Response } from "express";
import { itemRouter } from "./routes/itemRoutes";
import { userRouter } from "./routes/userRoutes";
import sqlconnections from "./configs/db.sql"
require("dotenv/config");

const app = express();
const PORT = process.env.port;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', itemRouter);
app.use('/', userRouter);

//connects();
sqlconnections();

app.listen(PORT, (): void => {
    console.log(`server is running on ${PORT}`);
})