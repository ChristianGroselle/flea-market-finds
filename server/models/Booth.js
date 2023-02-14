const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const User = require('./User');
const Product = require('./Product');

const boothSchema = new Schema({
  boothName: {
    type: String,
    required: true,
    trim: true
  },
  owner:{
    type: Schema.Types.ObjectId,
    ref: 'User'
    },
  accountManager: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  ],
  product: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
