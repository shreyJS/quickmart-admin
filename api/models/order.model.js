import mongoose from "mongoose";

const genNum = () => {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000);
  return timestamp + randomNum;
};

const orderInvoiceSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  totalCost: Number,
});

const orderSchema = mongoose.Schema(
  {
    custName: {
      type: String,
      required: false,
    },
    custId: {
      type: Number,
      required: false,
      default: genNum(),
    },
    items: {
        type:[orderInvoiceSchema],
        required:true,
    },
    status: {
      type: String,
      required: true,
    },
    bill: {
      type: Number,
      required: true,
    },
    disc: {
      type: Number,
      default: 0.0,
      required: false,
    },
    amtPayable: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: false,
      default: "Unspecified",
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
