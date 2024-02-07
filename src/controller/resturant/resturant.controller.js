import asyncHandler from "../../middleware/async_handler.middleware.js";
import cloudinary from "../../utils/cloudinary.utils.js";
import { Resturant } from "../../model/resturant/resutrant.model..js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DeviceInfo from "../../model/device_info.model.js";

const loginResturant = asyncHandler(async (req, res) => {
  try {
    const {
      contact,
      password,
      deviceToken,
      deviceType,
      deviceName,
      deviceVersion,
      deviceManufacturer,
      deviceBrand,
      deviceIsPhysical,
      ip,
    } = req.body;
    console.log(req.body);
    const userType = "restaurant";
    const resturant = await Resturant.findOne({ contact });
    if (!resturant) {
      return res.status(400).json({ message: "Restaurant not found" });
    }
    const isMatch = await bcrypt.compare(password, resturant.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let updatedDevice = await DeviceInfo.findOneAndUpdate(
      { _id: resturant.device },
      {
        deviceToken,
        deviceType,
        deviceName,
        deviceVersion,
        deviceManufacturer,
        deviceBrand,
        deviceIsPhysical,
        ip,
      },
      { new: true }
    );

    if (!updatedDevice) {
      updatedDevice = await DeviceInfo.create({
        deviceToken,
        deviceType,
        deviceName,
        deviceVersion,
        deviceManufacturer,
        deviceBrand,
        deviceIsPhysical,
        ip,
      });
    }

    await Resturant.findByIdAndUpdate(
      { _id: resturant._id },
      { device: updatedDevice._id }
    );

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
      device: updatedDevice._id,
    };
    return res.status(200).json(resturantResponse);
  } catch (error) {
    console.log(error);
  }
});

export { loginResturant };
