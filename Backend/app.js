import express from "express";
import cors from "cors";
import sequelize, { connectDB } from "./config/db.js";
import employeeRoutes from "./routes/emproutes.js";
import "./models/employee.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.use("/uploads", express.static("uploads"));
connectDB();

const startServer = async () => {
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log("Tables created");

    app.listen(PORT, () => {
        console.log("Server running");
    });
};

app.get("/", (req, res) => {
    res.send("Helloworld");
});

startServer();

