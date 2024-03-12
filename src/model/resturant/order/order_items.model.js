import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    status: {
      type: String,
      default: "Placed",
      enum: ["Placed", "Preparing", "Cancelled", "Delivered"],
    },
  },
  { versionKey: false, timestamps: true }
);

export const OrderItems = mongoose.model("OrderItems", orderItemsSchema);
