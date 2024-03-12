import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItems",
        required: true,
      },
    ],
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    paymentMode: {
      type: String,
      required: [true, "PaymentMode is Required"],
      enum: ["COD", "Online"],
      default: "COD",
    },
    tableNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    status: {
      type: String,
      default: "Placed",
      enum: ["Placed", "Preparing", "Cancelled", "Delivered"],
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Order = mongoose.model("order", orderSchema);

/* Order Example
{
  "orderItems" : [
      {
          "quantity": 3,
          "product" : "5fcfc406ae79b0a6a90d2585"
      },
      {
          "quantity": 2,
          "product" : "5fd293c7d3abe7295b1403c4"
      }
  ],
  "paymentMode": "COD",
  "tableNumber" : "45",
  "status" : "Placed",
  "totalPrice": "100",
  "user": "5fd51bc7e39ba856244a3b44"
}
*/
