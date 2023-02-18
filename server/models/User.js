const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Booth = require('./Booth');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  orders: [Order.schema],
  boothsOwned: 
  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Booth'
    }
  ],
  boothsManaging: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Booth'
    }
  ],
  isAdmin: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => { if (date) return date.toISOString().split("T") [0] }
  }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
