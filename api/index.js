import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import roleRoute from "./routes/role.js"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"

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

app.use("/api/auth", authRoute);
app.use("/api/role", roleRoute);
app.use("/api/user", userRoute);

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
