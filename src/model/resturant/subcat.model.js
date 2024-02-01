import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "resturant",
      required: [true, "Select restuarant"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategoryImage: {
      type: String,
      required: true,
      default: "",
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const SubCategory = mongoose.model("subcategory", subCategorySchema);
