import express from "express";
import authRoutes from "./routes/auth";
import subsRoutes from "./routes/subs";
import articlesRoutes from "./routes/articles";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const port = 8080;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("connected to db");
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/auth", authRoutes);
    app.use("/subs", subsRoutes);
    app.use("/articles", articlesRoutes);

    app.listen(port, () => console.log(`running on ${port}`));
  })
  .catch((error) => {
    throw new Error(error);
  });
