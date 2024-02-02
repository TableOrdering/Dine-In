import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  createTable,
  getAllTables,
  updateTableStatus,
} from "../../controller/resturant/table.controller.js";

const tableRouter = Router();

tableRouter.use(auth);
tableRouter.route("/createTable").post(createTable);
tableRouter.route("/getTables").get(getAllTables);
tableRouter.route("/updateTableStatus").put(updateTableStatus);

export default tableRouter;
