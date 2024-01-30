import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
  updateUserDetails,
} from "../../controller/user/user.controller.js";
import auth from "../../middleware/auth.middleware.js";

const userRoutes = Router();

userRoutes.post("/registerUser", registerUser);
userRoutes.post("/loginUser", loginUser);
userRoutes.route("/getAllUsers").get(auth, getAllUsers);
userRoutes.route("/updateUserDetails").put(auth, updateUserDetails);

export default userRoutes;
