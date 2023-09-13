const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json("product has been added successfully");
  } catch (err) {
    res.status(200).json(err);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (err) {
    res.status(200).json(err);
  }
};
module.exports = {
  addProduct,
  getProducts,
};
