import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next)=>{
    const role = await Role.find({role: 'user'});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        roles: role
    });

    await newUser.save();
    return next(CreateSuccess(200, "User Registered Sucessfulyy!"));
}


export const registerAdmin = async (req, res, next)=>{
    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        isAdmin: true,
        roles: role
    });

    await newUser.save();
    return next(CreateSuccess(200, "User Registered Sucessfulyy!"));
}

export const login = async (req, res, next)=>{

    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles", "role");

        if(!user) {
            return res.status(404).send("User not found!");
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).send("Password is incorrect!");
        }

        
        const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin, roles: user.roles},
            process.env.JWT_SECRET
        );
        
        
        res.cookie("acess_token", token, {httpOnly: true})
        .status(200)
        .json({
            status: 200,
            message: "Login Success",
            data: user
        });
        

        //return next(CreateSuccess(200, "Login Success!"));
    } catch (error) {
        return next(CreateError(500, "deu ruim"));
    }
    
}