import asyncHandler from "../../middleware/async_handler.middleware.js";
import { User } from "../../model/user/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;
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
  res.status(201).json(register);
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

export { registerUser, loginUser, updateUserDetails };
