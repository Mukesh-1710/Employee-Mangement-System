import {Sequelize} from "sequelize";

const sequelize = new Sequelize({
    database: "emp_db", 
    username: "root",
    password: "root",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
});

export const connectDB = async()=>{
try{
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
}
catch (err) {
    console.error("Unable to connect to the database:", err);
}
}
export default sequelize;