import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: {
      type: Number,
      required: [true, "Please Enter Phone Number"],
      unique: true,
    },
    password: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

export const User = mongoose.model("user", userSchema);
