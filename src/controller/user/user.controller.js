import asyncHandler from "../../middleware/async_handler.middleware.js";
import { User } from "../../model/user/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Product } from "../../model/resturant/order/product.model.js";
import { Category } from "../../model/resturant/category.model.js";
import { Table } from "../../model/resturant/table.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;
  const userType = "user";
  const salt = await bcrypt.genSalt(10);
  if (!name || !phone || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, salt);

  const register = new User({
    name,
    phone,
    password: hashedPassword,
  });
  await register.save();

  // Now generate token for the newly registered user
  const token = jwt.sign(
    { id: register._id, userType: userType },
    process.env.JWT_SECRET,
    {
      expiresIn: "1w",
    }
  );

  const userResponse = {
    id: register._id,
    name: register.name,
    phone: register.phone,
    token: token,
  };
  await register.save();

  res.status(201).json(userResponse);
});

const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  const userType = "user";
  const user = await User.findOne({ phone });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user._id, userType: userType },
    process.env.JWT_SECRET,
    {
      expiresIn: "1w",
    }
  );
  const userResponse = {
    id: user._id,
    name: user.name,
    phone: user.phone,
    token: token,
  };
  return res.status(200).json(userResponse);
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const updateUser = await User.findByIdAndUpdate(id, { $set: req.body });
  if (!updateUser) {
    return res.status(400).json({ message: "User not updated" });
  }
  return res.status(200).json({ message: "User Updated Successfully" });
});

const getCategoryOfResturant = asyncHandler(async (req, res) => {
  let { restaurantId, page = 0, limit = 10 } = req.query;
  const skip = page * limit;
  if (!restaurantId) {
    return res.status(400).json({ message: "No Resturant Found" });
  }
  const category = await Category.find({ resturant: restaurantId })
    .skip(skip)
    .limit(parseInt(limit))
    .lean()
    .exec();

  if (!category || category.length === 0) {
    return res.status(404).json([]);
  }
  return res.status(200).json(category);
});

const getProductsBasedOnCategory = asyncHandler(async (req, res) => {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({ message: "category NotFound" });
  }
  const products = await Product.find({ category: category }).exec();
  if (!products || products.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(products);
});

export {
  registerUser,
  loginUser,
  updateUserDetails,
  getProductsBasedOnCategory,
  getCategoryOfResturant,
};
