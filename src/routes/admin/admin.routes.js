import {
  loginAdmin,
  getAllResturants,
  registerAdmin,
  getAllUsers,
  deleteResturant,
  deleteUser,
  registerResturant,
} from "../../controller/admin/admin.controller.js";
import auth from "../../middleware/auth.middleware.js";
import upload from "../../middleware/multer.middleware.js";
import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/loginAdmin", loginAdmin);
adminRouter.post("/RegisterAdmin", registerAdmin);
adminRouter.post(
  "/registerResturant",
  upload.single("resturantImage"),
  registerResturant
);
adminRouter.route("/getAllResturants").get(auth, getAllResturants);
adminRouter.route("/getAllUsers").get(auth, getAllUsers);
adminRouter.route("/deleteResturant").delete(auth, deleteResturant);
adminRouter.route("/deleteUser").delete(auth, deleteUser);

export default adminRouter;
