import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema( {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
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