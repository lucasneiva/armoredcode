import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
import jwt from "jsonwebtoken";
import UserToken from "../models/userTokenModel.js";
import nodemailer from "nodemailer";
import { handleValidationError } from "../utils/handleValidationError.js";
import ClientProfile from "../models/clientProfileModel.js"
import FreelancerProfile from "../models/freelancerProfileModel.js"
export const register = async (req, res, next) => {
    try {
        const newUserData = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUserData.password, salt);


        const newUser = new User({
            username: newUserData.username,
            email: newUserData.email,
            password: hashPassword,
            role: newUserData.role,
            profile: null
        });

        await newUser.save();

        return next(createSuccess(200, "User Registered Successfully!"));
    } catch (error) {
        // console.log( error.name );

        handleValidationError(error, next);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(createError(404, "User Not Found!"));
        }

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return next(createError(400, "Password is incorrect!"));
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET
        );

        // Verifica se o usuário possui um perfil
        let hasProfile = false;
        if (user.role === "CLIENT") {
            const clientProfile = await ClientProfile.findOne({ userId: user._id });
            hasProfile = !!clientProfile; // Converte para booleano
        } else if (user.role === "FREELANCER") {
            const freelancerProfile = await FreelancerProfile.findOne({
                userId: user._id,
            });
            hasProfile = !!freelancerProfile; // Converte para booleano
        }

        //modified
        res.cookie("acess_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({
                status: 200,
                message: "Login Success",
                data: user,
                token: token,
                userRole: user.role // Add userRole to the response 
            });
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};

export const sendEmail = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } })

    if (!user) {
        return next(createError(404, "User not found to rest the email!"))
    }

    const payload = {
        email: user.email
    }

    const expiryTime = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime })

    const newToken = new UserToken({
        userId: user._id,
        token: token
    })

    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "armoredcode2@gmail.com",
            pass: "fxzzygovyurfdynn"
        }
    })

    //modified
    let mailDetails = {
        from: "armoredcode2@gmail.com",
        to: email,
        subject: "Redefinir Senha",
        html: 
        `<html>
            <head>
                <title>Pedido de Redefinição de Senha</title>
            </head>
            <body style="color: #000000">
                <h1>Pedido de Redefinição de Senha</h1>
                <p>Caro(a) ${user.username}, </p>
                <p style="margin-bottom: 3rem">Recebemos uma solicitação para redefinir a senha da sua conta na ArmoredCode. Para concluir o processo de redefinição de senha, clique no botão abaixo:</p>
        
                <a href="${process.env.LIVE_URL}/reset/${token}" style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px; text-decoration: none;">Redefinir Senha</a>
        
                <p style="margin-top: 3rem">Atenciosamente,</p>
                <p> Equipe ArmoredCode </p>
                <p> <strong> Observação: </strong> Este link é válido apenas por 5 minutos. Se você não solicitou a redefinição de senha, ignore esta mensagem.</p>
                
            </body>
        </html>`,
    };

    mailTransporter.sendMail(mailDetails, async (err, data) => {
        if (err) {
            console.log(err);
            return next(createError(500, "Something went wrong while sending the email"));
        } else {
            await newToken.save();
            return next(createSuccess(200, "Email Sent Successfully!"));
        }
    })


}

export const resetPassword = async (req, res, next) => {
    const token = req.body.token;
    const newPassword = req.body.password;

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return next(createError(500, "Reset Link is Expired!"))
        } else {
            const response = data;
            const user = await User.findOne({ email: { $regex: '^' + response.email + '$', $options: 'i' } });

            const salt = await bcrypt.genSalt(10);

            const encryptedPassword = await bcrypt.hash(newPassword, salt);

            user.password = encryptedPassword;

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: user },
                    { new: true }
                )
                return next(createSuccess(200, "Password Reset Success!"));
            } catch (error) {
                return next(createError(500, "Something went worng while resetting the password!"));
            }


        }
    })
}