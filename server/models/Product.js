const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  condition: {
    type: String,
  },
  timeOnMarket: {
    type: Date,
    default: Date.now,
    get: (date) => {
      if (date) return date.toISOString().split("T")[0];
    },
  },
  discountTimerOn: {
    type: Boolean,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// how to store images and let users upload images??
// this is tricky. We'll have to convert the images into their binary string. Then pull it out of the database, and configure how we want to dislpay the image.
// we can use GridFS to break the file into multiple chuncks. Then we can get
