import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Select Category"],
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
    required: [true, "Select SubCategory"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
    required: true,
    enum: [true, false],
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

export const Menu = mongoose.model("Menu", menuSchema);
