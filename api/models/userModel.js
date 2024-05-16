import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema( {
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
        minLength: 2,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
        validate: {
            validator: function ( email ) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( email );
            },
            message: "Invalid email address."
        }
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: [ "CLIENT", "FREELANCER" ],
        required: true,
    },

},

    { timestamps: true }
);

export default mongoose.model( "User", UserSchema );