import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategoryStatus,
} from "../../controller/resturant/category.controller.js";
import upload from "../../middleware/multer.middleware.js";

const categoryRouter = Router();
categoryRouter.use(auth);

categoryRouter
  .route("/createCategory")
  .post(upload.single("categoryImage"), createCategory);
categoryRouter.route("/getAllCategory").get(getAllCategory);
categoryRouter.route("/updateAvailability").put(updateCategoryStatus);
categoryRouter.route("/deleteCategory").delete(deleteCategory);

export default categoryRouter;
