import mongoose from "mongoose";

// Product contains 9 fields
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    //TODO: add Date
    //TODO: add rating
    //TODO: add review

    costPrice: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
    },
    category: {
      type: String,
      default: "General",
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2017/06/10/07/20/milk-2389222_1280.png",
    },
    qty: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      default: "General",
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    labelPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
