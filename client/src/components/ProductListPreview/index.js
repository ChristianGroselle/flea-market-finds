import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import PreviewItem from "../PreviewItem";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function ProductListPreview({ searchText, selectedCategory }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { products, currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
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

    // Limit the number of products to 4
    filteredProducts = filteredProducts.slice(-4);

    return filteredProducts;
  }

  return (
    <>
      {products.length ? (
        <>
          {filterProducts().map((product) => (
            <PreviewItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default ProductListPreview;
