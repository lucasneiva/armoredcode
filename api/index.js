import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import roleRoute from "./routes/role.js"

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

app.use("/api/role", roleRoute)
app.listen(8800, ()=> {
    connectMongoDB();
    console.log("connected to backend!");

})
