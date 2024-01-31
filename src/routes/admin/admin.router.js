import {
  loginAdmin,
  getAllResturants,
  registerAdmin,
  getAllUsers,
  deleteResturant,
  deleteUser,
} from "../../controller/admin/admin.controller.js";
import auth from "../../middleware/auth.middleware.js";
import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/loginAdmin", loginAdmin);
adminRouter.post("/RegisterAdmin", registerAdmin);
adminRouter.route("/getAllResturants").get(auth, getAllResturants);
adminRouter.route("/getAllUsers").get(auth, getAllUsers);
adminRouter.route("/deleteResturant").delete(auth, deleteResturant);
adminRouter.route("/deleteUser").delete(auth, deleteUser);

export default adminRouter;
