import asyncHandler from "../../middleware/async_handler.middleware.js";
import { Resturant } from "../../model/resturant/resutrant.model..js";
import cloudinary from "../../utils/cloudinary.utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerResturant = asyncHandler(async (req, res) => {
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
});

const loginResturant = asyncHandler(async (req, res) => {
  const { contact, password } = req.body;
  const userType = "restaurant";
  const resturant = await Resturant.findOne({ contact });
  if (!resturant) {
    return res.status(400).json({ message: "Resturant not found" });
  }
  const isMatch = await bcrypt.compare(password, resturant.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: resturant._id, userType: userType },
    process.env.JWT_SECRET,
    {
      expiresIn: "1w",
    }
  );
  const resturantResponse = {
    id: resturant._id,
    name: resturant.name,
    description: resturant.description,
    address: resturant.address,
    resturantImage: resturant.resturantImage,
    contact: resturant.contact,
    userType: userType,
    token: token,
  };
  return res.status(200).json(resturantResponse);
});

export { loginResturant, registerResturant };
