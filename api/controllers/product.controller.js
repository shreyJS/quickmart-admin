// admin fun => crud products
import { errorHandler } from "../utils/error.js";
import Product from "../models/product.model.js";

// CREATE
export const createProduct = async (req, res, next) => {
  // verify admin
  // POST req sending product data
  try {
    const {
      name,
      costPrice,
      sellingPrice,
      desc = "",
      category = "General",
      image = "https://cdn.pixabay.com/photo/2017/06/10/07/20/milk-2389222_1280.png",
      qty = 0,
      brand = "General",
      labelPrice = 0,
    } = req.body;
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a product"));
    }

    const newProduct = new Product({
      name,
      costPrice,
      sellingPrice,
      desc,
      category,
      image,
      qty,
      brand,
      labelPrice,
    });

    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// READ
export const getProduct = async (req, res, next) => {
  // get list of products - accessible to everyone

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const products = await Product.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalProducts = await Product.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthProducts = await Product.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ products, totalProducts, lastMonthProducts });
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateProduct = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to update this product")
    );
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.prodId,
      {
        $set: {
          name: req.body.name,
          costPrice: req.body.costPrice,
          desc: req.body.desc,
          category: req.body.category,
          image: req.body.image,
          qty: req.body.qty,
          brand: req.body.brand,
          sellingPrice: req.body.sellingPrice,
          labelPrice: req.body.labelPrice,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteProduct = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this product")
    );
  }
  try {
    await Product.findByIdAndDelete(req.params.prodId);
    res.status(200).json("The product has been deleted");
  } catch (error) {
    next(error);
  }
};
