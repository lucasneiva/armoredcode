import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profiles", profileRoutes);

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

//Error Handler Middleware
app.use((obj, req, res, next)=>{
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong!";

    return res.status(statusCode).json({
        success: [200, 201, 204].some(a=> a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
});

app.listen(8800, ()=> {
    connectMongoDB();
    console.log("connected to backend!");

})
