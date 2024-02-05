import { Router } from "express";
import { loginResturant } from "../../controller/resturant/resturant.controller.js";

const resturantRouter = Router();
resturantRouter.post("/loginResturant", loginResturant);

export default resturantRouter;
