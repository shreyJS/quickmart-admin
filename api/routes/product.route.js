import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();
router.post("/create-product", verifyToken, createProduct);
router.get("/get-products", verifyToken, getProduct);
router.put("/update-product/:prodId", verifyToken, updateProduct);
router.delete("/delete-product/:prodId", verifyToken, deleteProduct);
export default router;
