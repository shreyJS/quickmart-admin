// lib imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// file imports
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
// third-party lib imports
import cookieParser from "cookie-parser";

// configs and connects
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`connected to MongoDB`);
  })
  .catch((err) => {
    console.log(err);
  });

// app init
const app = express();
app.use(express.json());
app.use(cookieParser());

// setting up sample and main routes
app.listen(3000, () => {
  console.log(`server is running`);
});
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/prod", productRoutes);
app.use("/api/order", orderRoutes);

// middleware function(s)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
