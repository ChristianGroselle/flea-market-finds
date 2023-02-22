const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const Order = require("./Order");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  orders: [Order.schema],
  boothsOwned: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booth",
    },
  ],
  boothsManaging: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booth",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   get: (date) => { if (date) return date.toISOString().split("T") [0] }
    // }
    type: String,
    default: Date.now,
    set: (d) => {
      let date = new Date(d);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;

      return (
        monthNames[date.getMonth()] +
        " " +
        date.getDate() +
        ", " +
        date.getFullYear() +
        " at " +
        strTime
      );
    },
  },
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
