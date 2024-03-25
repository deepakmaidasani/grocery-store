import {DataSource} from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "grocery_store",
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
