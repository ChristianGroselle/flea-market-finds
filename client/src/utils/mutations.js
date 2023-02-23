import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_BOOTH = gql`
  mutation addBooth($boothName: String!, $description: String!) {
    addBooth(boothName: $boothName, description: $description) {
      boothName
      description
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ASSIGN_PRODUCT_TO_BOOTH = gql`
  mutation assignProductToBooth(
    $name: String!
    $description: String
    $price: Float!
    $quantity: Int!
    $category: ID!
    $condition: String
    $boothId: ID!
    $image: String
  ) {
    assignProductToBooth(
      name: $name
      description: $description
      price: $price
      quantity: $quantity
      category: $category
      condition: $condition
      boothId: $boothId
      image: $image
    ) {
      _id
      name
      description
      quantity
      price
    }
  }
`;

export const SINGLE_UPLOAD = gql`
  mutation imageUpload($base64Image: String!) {
    imageUpload(base64Image: $base64Image)
  }
`;
