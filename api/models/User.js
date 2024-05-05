import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema( {
    username: {
      type: String,
      required: true,
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

    profile: {
      type: Schema.Types.ObjectId,
      refPath: "role",
      required: false,
    },

  },

  { timestamps: true }
);

export default mongoose.model( "User", UserSchema );