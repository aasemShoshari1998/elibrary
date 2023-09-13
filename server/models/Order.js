const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  items: {
    type: Array,
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("order", ordersSchema);
