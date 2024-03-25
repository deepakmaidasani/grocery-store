import express,{Request,Response} from "express";
import {itemRouter} from "./routes/itemRoutes";
import {userRouter} from "./routes/userRoutes";
import sqlconnections from "./configs/db.sql"
require("dotenv/config");

const app = express();
const PORT = 4011;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',itemRouter);
app.use('/',userRouter);


app.get('/test',(req:Request,resp:Response):void=>{
    resp.json({data:"test page 1011"})
})

//connects();
sqlconnections();

app.listen(PORT,():void=>{
    console.log(`server is aleady running on ${PORT}`);
})