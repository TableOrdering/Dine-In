import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user/user.routes.js";
import resturantRouter from "./routes/resturant/resturant.routes.js";
import adminRouter from "./routes/admin/admin.router.js";
import categoryRouter from "./routes/resturant/category.routes.js";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/DineIn", userRoutes);
app.use("/api/v1/resturant", resturantRouter, categoryRouter);
app.use("/api/v1/admin", adminRouter);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
