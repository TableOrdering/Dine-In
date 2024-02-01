import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  createCategory,
  createSubCategory,
  getAllCategory,
  getAllSubCategory,
  updateCategory,
  updateSubCategory,
} from "../../controller/resturant/category.controller.js";
import upload from "../../middleware/multer.middleware.js";

const categoryRouter = Router();
categoryRouter.use(auth);

categoryRouter
  .route("/createCategory")
  .post(upload.single("categoryImage"), createCategory);
categoryRouter.route("/getAllCategory").get(getAllCategory);
categoryRouter.route("/updateAvailability").put(updateCategory);
categoryRouter
  .route("/createSubCategory")
  .post(upload.single("subcategoryImage"), createSubCategory);
categoryRouter.route("/getAllSubCategory").get(getAllSubCategory);
categoryRouter.route("/updateSubAvailability").put(updateSubCategory);

export default categoryRouter;
