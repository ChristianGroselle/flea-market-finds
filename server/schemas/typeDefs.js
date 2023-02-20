const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
    category: Category
    condition: String
    createdAt: String
    discountTimerOn: Boolean
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    orders: [Order]
    boothsOwned: [Booth]
    boothsManaging: [Booth]
    isAdmin: Boolean
    createdAt: String
  }

  type Booth {
    _id: String
    boothName: String
    owner: [User]
    accountManager: [User]
    product: [Product]
    description: String
    logo: String
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: String
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    userOrders: [Order]
    checkout(products: [ID]!): Checkout
    booth(_id: ID!): Booth
    booths: [Booth]
    userBooths: [Booth]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    deleteUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): Auth

    login(email: String!, password: String!): Auth

    addOrder(products: [ID]!): Order

    addBooth(boothName: String!, description: String!, logo: String): Booth
    updateBooth(boothName: String!, description: String!, logo: String): Booth
    deleteBooth(boothName: String!, description: String!, logo: String): Booth

    addProduct(
      name: String!
      price: Float!
      image: String
      category: [String]!
      condition: String!
    ): Product
    updateProduct(_id: ID!, quantity: Int!): Product
    deleteProduct(
      name: String!
      price: Float!
      image: String
      category: [String]!
      condition: String!
    ): Product
  }
`;

module.exports = typeDefs;
