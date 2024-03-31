import { errorHandler } from "../utils/error.js";
import Order from "../models/order.model.js";

const genNum = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    return timestamp + randomNum;
  };

// Create order
export const createOrder = async (req,res,next) =>{
    // order can be created by both client and admin
    try {
        const {
            custName = "",
            custId = genNum(),
            items,
            status,
            bill,
            disc = 0.0,
            amtPayable,
            paymentMethod = "Unspecified",
          } = req.body;

          const newOrder = new Order({
            custName,
            custId,
            items,
            status,
            bill,
            disc,
            amtPayable,
            paymentMethod,
          });
      
          await newOrder.save();
      
          res.status(200).json(newOrder);

    } catch (error) {
        next(error);
    }
}
// Read all orders
export const getOrders = async (req,res,next) =>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === "desc" ? -1 : 1;
        const orders = await Order.find()
          .sort({ createdAt: sortDirection })
          .skip(startIndex)
          .limit(limit);
        const totalOrders = await Order.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        const lastMonthOrder = await Order.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({ orders, totalOrders, lastMonthOrder });
      } catch (error) {
        next(error);
      }
}
// read order by user ID
export const getOrderById = async (req,res,next) =>{}
// Update order
export const updateOrder = async (req,res,next) =>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
          req.params.orderId,
          {
            $set: {
              custName: req.body.custName,
              custId: req.body.custId,
              items: req.body.items,
              status: req.body.status,
              bill: req.body.bill,
              disc: req.body.disc,
              amtPayable: req.body.amtPayable,
              paymentMethod: req.body.paymentMethod,
            },
          },
          { new: true }
        );
        res.status(200).json(updatedOrder);
      } catch (error) {
        next(error);
      }
}
// Delete order
export const deleteOrder = async (req,res,next) =>{
    try {
        await Order.findByIdAndDelete(req.params.orderId);
        res.status(200).json("The order has been deleted");
      } catch (error) {
        next(error);
      }
}