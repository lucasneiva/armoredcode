import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import jwt from "jsonwebtoken";
import UserToken from "../models/userTokenModel.js";
import nodemailer from "nodemailer";

export const register = async ( req, res, next ) => {
    try {
        const newUserData = req.body;

        const salt = await bcrypt.genSalt( 10 );
        const hashPassword = await bcrypt.hash( newUserData.password, salt );


        const newUser = new User( {
            username: newUserData.username,
            email: newUserData.email,
            password: hashPassword,
            role: newUserData.role,
            profile: null
        } );

        await newUser.save();

        return next( CreateSuccess( 200, "User Registered Successfully!" ) );
    } catch ( error ) {
        if ( error.name === 'ValidationError' ) {
            const errors = {};
            Object.keys( error.errors ).forEach( ( key ) => {
                errors[ key ] = error.errors[ key ].message;
            } );
            return next( CreateError( 400, errors ) );
        } else {
            console.error( error );
            return next( CreateError( 500, 'Internal Server Error' ) );
        }
    }
};

export const login = async ( req, res, next ) => {
    try {
        const user = await User.findOne( { email: req.body.email } );

        if ( !user ) {
            return next( CreateError( 404, "User Not Found!" ) );
            // return res.status( 404 ).send( "User not found!" );
        }

        const isPasswordCorrect = await bcrypt.compare( req.body.password, user.password );

        if ( !isPasswordCorrect ) {
            return CreateError( 400, "Password is incorrect!" );
            // return res.status( 400 ).send( "Password is incorrect!" );
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET
        );

        const origin = req.headers.origin;
        const isAngularFrontend = origin === 'http://localhost:4200';

        res.cookie( "acess_token", token, {
            /* secure: true,
            sameSite: 'None', */ // Allow in cross-site requests
            httpOnly: true
        } )
            .status( 200 )
            .json( {
                status: 200,
                message: "Login Success",
                data: user
            } );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );

    }

}

export const sendEmail = async ( req, res, next ) => {
    const email = req.body.email;
    const user = await User.findOne( { email: { $regex: '^' + email + '$', $options: 'i' } } )

    if ( !user ) {
        return next( CreateError( 404, "User not found to rest the email!" ) )
    }

    const payload = {
        email: user.email
    }

    const expiryTime = 300;
    const token = jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: expiryTime } )

    const newToken = new UserToken( {
        userId: user._id,
        token: token
    } )

    const mailTransporter = nodemailer.createTransport( {
        service: "gmail",
        auth: {
            user: "armoredcode2@gmail.com",
            pass: "fxzzygovyurfdynn"
        }
    } )

    let mailDetails = {
        from: "armoredcode2@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `<html>
    <head>
    <title>Password Reset Request</title>
    </head>
    <body>
    <h1>Password Reset Request</h1>
    <p>Dear ${user.username}, </p>
    <p>We have received a request to reset your password for your account with ArmoredCode. To complete the password reset process, please click on the button below:</p> <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none;
    cursor: pointer; border-radius: 4px;">Reset Password</button></a>
    <p>Thank you,</p>
    <p>Please note that this link is only valid for a 5mins. If you did not request a password reset, please disregard this message.</p>
    <p>ArmoredCode Team</p>
    </body>
</html>`,

    };

    mailTransporter.sendMail( mailDetails, async ( err, data ) => {
        if ( err ) {
            console.log( err );
            return next( CreateError( 500, "Something went wrong while sending the email" ) );
        } else {
            await newToken.save();
            return next( CreateSuccess( 200, "Email Sent Successfully!" ) );
        }
    } )


}

export const resetPassword = async ( req, res, next ) => {
    const token = req.body.token;
    const newPassword = req.body.password;
    console.log( "Entrou na func" );
    jwt.verify( token, process.env.JWT_SECRET, async ( err, data ) => {
        if ( err ) {
            return next( CreateError( 500, "Reset Link is Expired!" ) )
        } else {
            const response = data;
            const user = await User.findOne( { email: { $regex: '^' + response.email + '$', $options: 'i' } } );

            const salt = await bcrypt.genSalt( 10 );

            const encryptedPassword = await bcrypt.hash( newPassword, salt );

            user.password = encryptedPassword;

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: user },
                    { new: true }
                )
                return next( CreateSuccess( 200, "Password Reset Success!" ) );
            } catch ( error ) {
                return next( CreateError( 500, "Something went worng while resetting the password!" ) );
            }


        }
    } )
}