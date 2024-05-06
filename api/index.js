import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import projectRoute from "./routes/project.js";
import profileRoute from "./routes/profile.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/project", projectRoute);
app.use("/api/profile", profileRoute);

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
