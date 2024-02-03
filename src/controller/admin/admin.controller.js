import asyncHandler from "../../middleware/async_handler.middleware.js";
import { Resturant } from "../../model/resturant/resutrant.model..js";
import { User } from "../../model/user/user.model.js";
import { Admin } from "../../model/admin/admin.model.js";
import cloudinary from "../../utils/cloudinary.utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const salt = await bcrypt.genSalt(10);
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin({
    name,
    email,
    password: hashedPassword,
  });
  await admin.save();
  res.status(201).json(admin);
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userType = "admin";
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: admin._id, userType: userType },
    process.env.JWT_SECRET
  );
  const adminResponse = {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    token: token,
  };
  return res.status(200).json(adminResponse);
});

const registerResturant = asyncHandler(async (req, res) => {
  try {
    const { name, description, address, contact, password } = req.body;
    if (!name || !contact || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const resturant = await Resturant.findOne({ contact });
    if (resturant) {
      return res.status(400).json({ message: "Resturant already exists" });
    }
    const resImage = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "DineIn/",
        use_filename: true,
      },
      (err, resu) => {
        if (err) {
          res.status(500);
          throw new Error(`Error : ${err}`);
        }
        console.log(`UpLoaded`);
      }
    );
    if (!resImage) {
      return res.status(400).json({ message: "Image not uploaded" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const resturantImage = resImage.secure_url;
    const newResturant = new Resturant({
      name,
      contact,
      description,
      address,
      resturantImage,
      password: hashedPassword,
    });
    await newResturant.save();
    return res.status(200).json({ message: "Resturant registered successfully" });
  } catch (error) {
     console.log(error);
  }
 });

const getAllResturants = asyncHandler(async (req, res) => {
  let { page = 0, limit = 10 } = req.query;
  const skip = page * limit;
  const resturants = await Resturant.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();
  if (!resturants) {
    return res.status(404).json({ message: "No Resturants Found" });
  }
  res.status(200).json(resturants);
});

const deleteResturant = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const resturant = await Resturant.findById(id);
  if (!resturant) {
    return res.status(404).json({ message: "Resturant not found" });
  }

  if (resturant.resturantImage) {
    await cloudinary.uploader.destroy(resturant.resturantImage);
  }
  await Resturant.findByIdAndDelete(id);
  res.status(200).json({ message: "Resturant deleted successfully" });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  let { page = 0, limit = 10 } = req.query;
  const skip = page * limit;
  const users = await User.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  res.status(200).json(users);
});

export {
  getAllResturants,
  registerAdmin,
  loginAdmin,
  getAllUsers,
  deleteResturant,
  deleteUser,
  registerResturant,
};
