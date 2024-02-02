import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const OrderItems = mongoose.model("OrderItems", orderItemsSchema);
