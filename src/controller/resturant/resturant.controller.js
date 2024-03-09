import asyncHandler from "../../middleware/async_handler.middleware.js";
import { Resturant } from "../../model/resturant/resutrant.model..js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DeviceInfo from "../../model/device_info.model.js";
import { Order } from "../../model/resturant/order/order.model.js";

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

const getOrders = asyncHandler(async (req, res) => {
  const { restaurantId } = req.restaurant;

  const orders = await Order.find()

    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: {
          path: "category",
        },
      },
    })
    .populate({
      path: "tableNumber",
      select: "-qrCodeData",
      populate: {
        path: "resturant",
        select: "-devices",
      },
    })
    .populate({ path: "user", select: "-password" })

    .exec();

  const filteredOrders = orders.filter((order) => {
    return (
      order.tableNumber &&
      order.tableNumber.resturant._id.toString() === restaurantId.toString()
    );
  });

  return res.status(200).json(filteredOrders);
});

export { loginResturant, getOrders };

/// DINEIN FIRST
// 9164444469
// 65bc71d9b0f7049e2ab68ab6
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmM3MWQ5YjBmNzA0OWUyYWI2OGFiNiIsInVzZXJUeXBlIjoicmVzdGF1cmFudCIsImlhdCI6MTcwOTk2MDcyMCwiZXhwIjoxNzEwNTY1NTIwfQ.l8CVw7paBrlbhMQIOR-AG8pfF4H-e_H3RilI-nRoMjQ

/// DINE IN SECOND
//  9916740712
// 65bc71ffb0f7049e2ab68aba
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmM3MWZmYjBmNzA0OWUyYWI2OGFiYSIsInVzZXJUeXBlIjoicmVzdGF1cmFudCIsImlhdCI6MTcwOTk2MDkyNSwiZXhwIjoxNzEwNTY1NzI1fQ.j7eFz35kB87l9XSNsRndoY6EKRUCQ4DggvuYhPUP92U
