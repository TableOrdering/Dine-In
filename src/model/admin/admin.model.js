import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: "Please fill a valid email address",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
      trim: true,
      message: "Password must be at least 6 characters",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Admin = mongoose.model("Admin", adminSchema);
