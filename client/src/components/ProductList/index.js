import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PRODUCTS, UPDATE_BOOTHS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { QUERY_BOOTH_WITH_PRODUCTS } from "../../utils/queries";

function ProductList({ id, searchText, selectedCategory }) {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const { products, booths, currentCategory } = state;

  const { loading, error, data } = useQuery(QUERY_BOOTH_WITH_PRODUCTS, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      console.log("data", data);
      const boothData = data.boothWithProducts;
      const productArr = boothData.product;
      dispatch({
        type: UPDATE_PRODUCTS,
        products: productArr,
      });
      productArr.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    let filteredProducts = state.products;

    if (currentCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category._id === currentCategory
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category._id === selectedCategory
      );
    }

    if (searchText) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filteredProducts;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
