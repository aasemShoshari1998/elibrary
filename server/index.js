const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const category = require("./routes/category");
const product = require("./routes/product");
const saltRounds = 10;
const user = require("./routes/user");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URL, () =>
  console.log("connected to MongoDB")
);

app.post("/signup", (req, res) => {
  user.signUp(req, res, bcrypt, saltRounds);
});
app.post("/login", (req, res) => {
  user.logIn(req, res, bcrypt);
});

app.post("/add-category", (req, res) => category.addCategory(req, res));
app.get("/get-categories", (req, res) => category.getCategories(req, res));
app.post("/add-product", (req, res) => product.addProduct(req, res));
app.get("/get-products/:category", (req, res) => product.getProducts(req, res));
app.post("/add-item-to-cart/:id", (req, res) =>
  user.addItemToShoppingCart(req, res)
);
app.post("/remove-item-from-cart/:id", (req, res) =>
  user.removeItemFromShoppingCart(req, res)
);

app.post("/order", (req, res) => {
  user.order(req, res);
});

app.get("/get-cart-items/:userId", (req, res) => user.getCartItems(req, res));

// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// const storeItems = map;

app.listen(8000, () => console.log("listening on port 8000"));
