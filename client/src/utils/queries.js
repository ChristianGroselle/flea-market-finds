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

// export const QUERY_BOOTH = gql`
//   {
//     query booth ($id: ID!) {
//       booth(id: $id){
//     _id
//       boothName
//       owner {
//         username
//       }
//       product {
//         name
//         image
//       }
//       description
//       logo
//       }

//     }
//   }
// `;

export const QUERY_BOOTH = gql`
  query getBooth($id: ID) {
    booth(id: $id) {
      _id
      boothName
      owner {
        username
      }
      product {
        name
        image
      }
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
export const USER_ORDERS = gql`
  {
    userOrders {
      purchaseDate
      products {
        name
        description
        price
        image
        quantity
      }
    }
  }
`;

export const QUERY_BOOTH_WITH_PRODUCTS = gql`
  query BoothWithProducts($id: ID!) {
    boothWithProducts(_id: $id) {
      _id
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

export const QUERY_BOOTHS = gql`
  query booths {
    booths {
      _id
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

export const USER_BOOTHS = gql`
  {
    userBooths {
      boothName
      description
      logo
    }
  }
`;
