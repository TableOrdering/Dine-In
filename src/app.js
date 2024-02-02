import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user/user.routes.js";
import resturantRouter from "./routes/resturant/resturant.routes.js";
import adminRouter from "./routes/admin/admin.router.js";
import categoryRouter from "./routes/resturant/category.routes.js";
import tableRouter from "./routes/resturant/table.routes.js";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import os from "os";
import cluster from "cluster";

dotenv.config({
  path: "./.env",
});

const app = express();
const numCPUs = os.cpus().length;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(mongoSanitize());
app.use(hpp());
app.use("/api/v1/DineIn", userRoutes);
app.use("/api/v1/resturant", resturantRouter, categoryRouter, tableRouter);
app.use("/api/v1/admin", adminRouter);

const PORT = process.env.PORT || 5000;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on("exit", (worker, code, signal) => cluster.fork());
} else {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}
