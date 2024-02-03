import asyncHandler from "../../middleware/async_handler.middleware.js";
import cloudinary from "../../utils/cloudinary.utils.js";
import { Resturant } from "../../model/resturant/resutrant.model..js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



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

export { loginResturant};
