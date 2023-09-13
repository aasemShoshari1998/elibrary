const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("user", usersSchema);
