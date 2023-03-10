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
      _id
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

export const UPDATE_USER_BOOTHS_OWNED = gql`
  mutation updateUserBoothsOwned($userId: ID!, $boothId: ID!) {
    updateUserBoothsOwned(userId: $userId, boothId: $boothId) {
      _id
      boothsOwned {
        _id
        boothName
      }
    }
  }
`;

export const DELETE_BOOTH = gql`
  mutation deleteBooth($_id: ID!) {
    deleteBooth(_id: $_id) {
      _id
      boothName
    }
  }
`;

// export const ADD_BOOTH = gql`
//   mutation addUser(
//     $firstName: String!
//     $lastName: String!
//     $email: String!
//     $password: String!
//   ) {
//     addUser(
//       firstName: $firstName
//       lastName: $lastName
//       email: $email
//       password: $password
//     ) {
//       token
//       user {
//         _id
//       }
//     }
//   }
// `;
