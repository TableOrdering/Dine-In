import mongoose from "mongoose";

const resturantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    resturantImage: { type: String, required: true },
    contact: { type: Number, required: true, unique: true },
    password: { type: String, required: [true, "Password is Required"] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Resturant = mongoose.model("resturant", resturantSchema);
