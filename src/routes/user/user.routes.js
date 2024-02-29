import { Router } from "express";
import {
  getCategoryOfResturant,
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

export default userRoutes;
