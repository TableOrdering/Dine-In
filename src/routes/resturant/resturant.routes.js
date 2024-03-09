import { Router } from "express";
import {
  getOrders,
  loginResturant,
} from "../../controller/resturant/resturant.controller.js";
import auth from "../../middleware/auth.middleware.js";

const resturantRouter = Router();
resturantRouter.post("/loginResturant", loginResturant);
resturantRouter.route("/getOrders").get(auth, getOrders);

export default resturantRouter;
