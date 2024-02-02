import auth from "../../middleware/auth.middleware.js";
import { Router } from "express";
import upload from "../../middleware/multer.middleware.js";
import {
  loginResturant,
  registerResturant,
} from "../../controller/resturant/resturant.controller.js";
import {
  createProduct,
  getProduct,
} from "../../controller/resturant/product.controller.js";

const resturantRouter = Router();

resturantRouter.post(
  "/registerResturant",
  upload.single("resturantImage"),
  registerResturant
);
resturantRouter.post("/loginResturant", loginResturant);
resturantRouter
  .route("/createProduct")
  .post(upload.single("productImage"), auth, createProduct);
resturantRouter.get("/getProduct", auth, getProduct);

export default resturantRouter;
