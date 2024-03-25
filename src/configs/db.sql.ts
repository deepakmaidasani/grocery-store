import {DataSource} from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: process.env.MYSQLPORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    logging: true,
    entities: ["./src/models/*.ts"],
})

export const entityManager = AppDataSource.manager;

const connections = ()=>{
AppDataSource.initialize().then(()=>{
    console.log("SQL DB Connected");
}).catch((err:any)=>{
    console.log("error:",err);
});
}

export default connections;
