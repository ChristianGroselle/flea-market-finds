const mongoose = require('mongoose');

const { Schema } = mongoose;

const boothSchema = new Schema({
  boothName: {
    type: String,
    required: true,
    trim: true,
    unique: true
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
  ],
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String
  }
});

const Booth = mongoose.model('Booth', boothSchema);

module.exports = Booth;
