import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tableNumber: {
      type: Number,
      required: [true, "Please Enter Table Number"],
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      enum: [true, false],
      default: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "resturant",
      required: true,
    },
    qrCodeData: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Table = mongoose.model("Table", tableSchema);
