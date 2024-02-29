import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  createTable,
  getAllTables,
  updateTableStatus,
  deleteTable,
  updateTableInfo,
} from "../../controller/resturant/table.controller.js";

const tableRouter = Router();

tableRouter.use(auth);
tableRouter.route("/createTable").post(createTable);
tableRouter.route("/getTables").get(getAllTables);
tableRouter.route("/updateTableStatus").put(updateTableStatus);
tableRouter.route("/deleteTable").delete(deleteTable);
tableRouter.route("/updateTable").put(updateTableInfo);

export default tableRouter;
