import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "resturant",
      required: true,
    },
    categoryImage: {
      type: String,
      required: true,
      default: "",
      trim: true,
    },
    foodType: {
      type: String,
      required: [true, "Food Type is Required"],
      default: "",
      trim: true,
      enum: ["veg", "non-veg"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
      enum: [true, false],
    },
  },
  { versionKey: false, timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
