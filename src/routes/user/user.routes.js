import { Router } from "express";
import {
  createOrder,
  getCategoryOfResturant,
  getOrderHistory,
  getProductsBasedOnCategory,
  loginUser,
  registerUser,
  updateUserDetails,
} from "../../controller/user/user.controller.js";
import auth from "../../middleware/auth.middleware.js";
import { getTableInfo } from "../../controller/resturant/table.controller.js";

const userRoutes = Router();

userRoutes.post("/registerUser", registerUser);
userRoutes.post("/loginUser", loginUser);
userRoutes.route("/updateUserDetails").put(auth, updateUserDetails);
userRoutes.route("/productsBasedOnCate").get(auth, getProductsBasedOnCategory);
userRoutes.route("/categories").get(auth, getCategoryOfResturant);
userRoutes.route("/getTableInfo").post(auth, getTableInfo);
/// 9-03-2024
userRoutes.route("/createOrder").post(auth, createOrder);
userRoutes.route("/getOrderHistory").get(auth, getOrderHistory);

export default userRoutes;
