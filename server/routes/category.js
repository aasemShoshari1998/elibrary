const Category = require("../models/Category");

const addCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(200).json("category has been added successfully");
  } catch (err) {
    res.status(200).json(err);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = {
  addCategory,
  getCategories,
};
