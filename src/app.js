import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";


dotenv.config({
  path: "./.env",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use("/api/v1", categoryRouter, userRouter);
// app.use("/api/v1/products", productRouter, orderRouter);

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
