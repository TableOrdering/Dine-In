import asyncHandler from "../../middleware/async_handler.middleware.js";
import cloudinary from "../../utils/cloudinary.utils.js";
import { Product } from "../../model/resturant/order/product.model.js";
import { Category } from "../../model/resturant/category.model.js";
import { extractPublicIdFromUrl } from "../../utils/id_founder.js";

const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, description, price, discount, rating, category, isAvailable } =
    req.body;
  if (!name || !description || !price || !category || !isAvailable) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    return res.status(400).json({ message: "Product already exists" });
  }
  const result = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "Product/",
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
  const productImage = result.secure_url;
  console.log("Image Uploaded");

  const product = await Product({
    name,
    description,
    price,
    discount,
    rating,
    category,
    isAvailable,
    productImage,
  });
  await product.save();
  res.status(201).json({
    message: "Product created successfully",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { page = 0, limit = 10 } = req.query;
  const skip = page * limit;
  const { restaurantId } = req.restaurant;

  const category = await Category.findOne({ resturant: restaurantId });

  if (!category) {
    return res
      .status(404)
      .json({ message: "Category not found for the given ID" });
  }

  const products = await Product.find({ category: category._id })
    .populate({
      path: "category",
      populate: "resturant",
    })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

  res.status(200).json(products);
});

const updateProductStatus = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }
  product.isAvailable = !product.isAvailable;
  await product.save();
  return res.status(200).json({ message: "Product Updated" });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }
  if (product.productImage) {
    try {
      const publicsId = extractPublicIdFromUrl(product.productImage);
      const splitter = publicsId.split(".")[0];
      await cloudinary.uploader.destroy(`Product/${splitter}`);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
  await product.deleteOne();
  return res.status(200).json({ message: "Product Deleted" });
});

export { createProduct, getProduct, updateProductStatus, deleteProduct };
