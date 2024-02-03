import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  createTable,
  getAllTables,
  getTableInfo,
  updateTableStatus,
} from "../../controller/resturant/table.controller.js";

const tableRouter = Router();

tableRouter.use(auth);
tableRouter.route("/createTable").post(createTable);
tableRouter.route("/getTables").get(getAllTables);
tableRouter.route("/updateTableStatus").put(updateTableStatus);
tableRouter.route("/getTableInfo").post(getTableInfo);

export default tableRouter;
