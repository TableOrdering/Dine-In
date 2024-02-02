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
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: 0,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "resturant",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Table = mongoose.model("Table", tableSchema);
