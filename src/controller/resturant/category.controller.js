import asyncHandler from "../../middleware/async_handler.middleware.js";
import cloudinary from "../../utils/cloudinary.utils.js";
import { Category } from "../../model/resturant/category.model.js";
import { SubCategory } from "../../model/resturant/subcat.model.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name, description, restaurant, foodType, isAvailable } = req.body;

  if (!name || !description || !restaurant || !foodType || !isAvailable) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const existingcat = await Category.findOne({ name });
  if (existingcat) {
    return res.status(400).json({ message: "Category already exists" });
  }
  const result = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "Category/",
      use_filename: true,
    },
    (err, resu) => {
      if (err) {
        res.status(500);
        throw new Error(`Error : ${err}`);
      }
    }
  );
  if (!result) {
    return res.status(400).json({ message: "Image not uploaded" });
  }
  const categoryImage = result.secure_url;

  const category = await Category({
    name,
    description,
    restaurant,
    foodType,
    isAvailable,
    categoryImage,
  });
  await category.save();
  return res.status(201).json(category);
});

const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find().populate({
    path: "restaurant",
    select: "-password",
  });
  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }
  return res.status(200).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }
  category.isAvailable = !category.isAvailable;
  await category.save();
  return res.status(200).json({ message: "Update Availability" });
});

const createSubCategory = asyncHandler(async (req, res) => {
  const { name, resturant, category, isAvailable } = req.body;

  if (!name || !resturant || !category || !isAvailable) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const existingcat = await SubCategory.findOne({ name });
  if (existingcat) {
    return res.status(400).json({ message: "SubCategory already exists" });
  }
  const result = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "Category/SubCategory/",
      use_filename: true,
    },
    (err, resu) => {
      if (err) {
        res.status(500);
        throw new Error(`Error : ${err}`);
      }
    }
  );
  if (!result) {
    return res.status(400).json({ message: "Image not uploaded" });
  }
  const subcategoryImage = result.secure_url;
  const subcategory = await SubCategory({
    name,
    resturant,
    category,
    subcategoryImage,
    isAvailable,
  });
  await subcategory.save();
  return res.status(201).json({ message: "Sub Category Created Successfully" });
});

const getAllSubCategory = asyncHandler(async (req, res) => {
  const subcategory = await SubCategory.find().populate("category");
  if (!subcategory) {
    return res.status(400).json({ message: "SubCategory not found" });
  }
  return res.status(200).json(subcategory);
});

const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const subcategory = await SubCategory.findById(id);
  if (!subcategory) {
    return res.status(400).json({ message: "SubCategory not found" });
  }
  subcategory.isAvailable = !subcategory.isAvailable;
  await subcategory.save();
  return res.status(200).json({ message: "Update Availability" });
});

export {
  createCategory,
  getAllCategory,
  updateCategory,
  createSubCategory,
  getAllSubCategory,
  updateSubCategory,
};
