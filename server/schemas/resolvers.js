const { AuthenticationError } = require("apollo-server-express");
const { strict } = require("assert");
const { User, Product, Category, Order, Booth } = require("../models");
const { signToken } = require("../utils/auth");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const fs = require("fs");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    userOrders: async (parent, args, context) => {
      if (context.user) {
        const user = await Order.find({
          where: {
            customerId: context.user._id,
          },
        }).populate("product");

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products");

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`], // CHECK LATER
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    boothWithProducts: async (parent, { _id }, context) => {
      const booth = await Booth.findById(_id).populate("product");
      return booth;
    },
    booth: async (parent) => {
      return await Booth.find();
    },
    booths: async () => {
      try {
        const booths = await Booth.find().populate("product");
        return booths;
      } catch (err) {
        console.log(err);
        throw new Error("Failed to get booths with products");
      }
    },
    userBooths: async (parent, args, context) => {
      return await Booth.find({
        where: {
          owner: context.user._id,
        },
      });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addBooth: async (parent, args, context) => {
      const booth = await Booth.create({
        boothName: args.boothName,
        description: args.description,
        logo: args.logo,
        owner: context.user._id,
      });
      // const token = signToken(booth);

      return booth;
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    assignProductToBooth: async (parent, args) => {
      let product = await Product.create(args);

      await Booth.findOneAndUpdate(
        {
          _id: args.boothId,
        },
        {
          $push: { product: product._id },
        }
      );

      return product;
    },
    imageUpload: async (parent, args) => {
      let name = Date.now();

      let extensions = {
        jpeg: "jpg",
        png: "png",
        bmp: "bmp",
        gif: "gif",
      };

      let ext = "jpg";

      if (args.base64Image.includes("image/jpeg")) ext = "jpg";
      else if (args.base64Image.includes("image/jpg")) ext = "jpg";
      else if (args.base64Image.includes("image/png")) ext = "png";
      else if (args.base64Image.includes("image/bmp")) ext = "bmp";
      else if (args.base64Image.includes("image/gif")) ext = "gif";

      let finalName = `${name}.${ext}`;
      let dir = `uploads/${finalName}`;

      var base64Data = args.base64Image.split(",")[1];
      await fs.writeFileSync(`./${dir}`, base64Data, "base64");
      return finalName;
    },
  },
};

module.exports = resolvers;
