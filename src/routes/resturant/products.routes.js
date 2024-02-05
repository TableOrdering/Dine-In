import { Router } from "express";
import upload from "../../middleware/multer.middleware.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProductStatus,
} from "../../controller/resturant/product.controller.js";
import auth from "../../middleware/auth.middleware.js";

const itemsRoute = Router();
itemsRoute.use(auth);

itemsRoute
  .route("/createProduct")
  .post(upload.single("productImage"), createProduct);
itemsRoute.route("/getProduct").get(getProduct);
itemsRoute.route("/updateProduct").put(updateProductStatus);
itemsRoute.route("/deleteProduct").delete(deleteProduct);

export default itemsRoute;
