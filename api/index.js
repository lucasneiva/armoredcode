import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import roleRoute from "./routes/role.js"
import authRoute from "./routes/auth.js"

const app = express();
dotenv.config();

app.use(express.json());

//DB Connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database!")
    }
    catch (error) {
        throw error;
    }
}

app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.listen(8800, ()=> {
    connectMongoDB();
    console.log("connected to backend!");

})
