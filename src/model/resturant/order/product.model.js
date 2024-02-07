import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0, max: 5, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isAvailable: { type: Boolean, default: false },
    productImage: {
      type: String,
      required: [true, "Please Select Product Image"],
    },
  },
  { versionKey: false, timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
