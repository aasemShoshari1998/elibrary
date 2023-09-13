const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const signUp = async (req, res, bcrypt, saltRounds) => {
  try {
    const { username, password } = req.body;

    const hashedPs = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username: username,
      password: hashedPs,
    });
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const logIn = async (req, res, bcrypt) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(404).json(false);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(false);
  }
};

const addItemToShoppingCart = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    await user.updateOne({ $push: { cartItems: req.params.id } });
    res.status(200).json("item has been added to cart");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const removeItemFromShoppingCart = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    await user.updateOne({ $pull: { cartItems: req.params.id } });
    res.status(200).json("item has been removed to cart");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const cartItems = await Promise.all(
      user.cartItems.map((itemId) => {
        return Product.findById({ _id: itemId });
      })
    );
    res.status(200).json(cartItems);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const order = async (req, res) => {
  try {
    const { userId, price, items, paymentId } = req.body;
    const newOrder = new Order({
      paymentId: paymentId,
      totalPrice: price,
      userId: userId,
      items: items,
    });

    const payment = await stripe.paymentIntents.create({
      amount: Math.round(price * 100),
      currency: "USD",
      description: "Elibrary Company",
      payment_method: "pm_card_visa",
    });
    const order = await newOrder.save();

    res.json({
      message: "Payment Successfull",
      success: true,
    });
  } catch (err) {
    res.json({
      message: "Payment Failed",
      success: false,
    });
    console.log(err);
  }
};

module.exports = {
  signUp,
  logIn,
  addItemToShoppingCart,
  removeItemFromShoppingCart,
  getCartItems,
  order,
};
