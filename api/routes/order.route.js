import express from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
// CRUD routes
router.post("/create-order", verifyToken, createOrder);
router.get("/get-orders", verifyToken, getOrders);
router.put("/update-orders/:orderId", verifyToken, updateOrder);
router.delete("/delete-orders/:orderId", verifyToken, deleteOrder);
export default router;
