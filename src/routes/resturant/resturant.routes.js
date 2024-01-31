import auth from "../../middleware/auth.middleware.js";
import { Router } from "express";
import upload from "../../middleware/multer.middleware.js";
import {
  loginResturant,
  registerResturant,
} from "../../controller/resturant/resturant.controller.js";

const resturantRouter = Router();

resturantRouter.post(
  "/registerResturant",
  upload.single("resturantImage"),
  registerResturant
);
resturantRouter.post("/loginResturant", loginResturant);

export default resturantRouter;
