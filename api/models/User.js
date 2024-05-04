import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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
      enum: ["CLIENT", "FREELANCER"],
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      refPath: "role",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);