import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
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
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_BOOTH = gql`
  {
    booth {
      _id
      boothName
      owner
      accountManager
      product
      description
      logo
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      username
      email
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
      createdAt
    }
  }
`;
<<<<<<< HEAD

export const QUERY_BOOTH_WITH_PRODUCTS = gql`
  query BoothWithProducts($id: ID!) {
    boothWithProducts(_id: $id) {
      boothName
      description
      product {
        _id
        name
        description
        image
        price
        quantity
      }
    }
  }
`;
// {
//   booth(_id: $id) {
//     boothName
//     description
//     product {
//       _id
//       name
//       description
//       price
//       quantity
//     }
//   }
// }
// `
=======
export const USER_BOOTHS = gql`
  {
    userBooths {
      boothName
      description
      logo
    }
  }
`;
>>>>>>> 07cbbca28324ab2407a0deb42b07859012600a41
