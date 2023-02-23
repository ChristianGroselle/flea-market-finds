import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import PreviewItem from "../PreviewItem";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_BOOTHS, UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { QUERY_BOOTH_WITH_PRODUCTS, QUERY_BOOTHS } from "../../utils/queries";

function ProductListPreview({ id, searchText, selectedCategory }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { products, booths, currentCategory } = state;

  const { loading, error, data } = useQuery(QUERY_BOOTHS, {});

  useEffect(() => {
    if (data) {
      const boothData = data.booths;
      dispatch({
        type: UPDATE_BOOTHS,
        booths: boothData,
      });
      boothData.forEach((booth) => {
        idbPromise("booths", "put", booth);
      });
    } else if (!loading) {
      idbPromise("booths", "get").then((booths) => {
        dispatch({
          type: UPDATE_BOOTHS,
          booths: booths,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    let filteredProducts = [];

    booths.forEach((booth) => {
      if (booth._id == id) {
        filteredProducts = booth.product;
      } else {
      }
    });
    if (filterProducts) {
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
      if (filteredProducts) {
        filteredProducts = filteredProducts.slice(-4);
      }

      return filteredProducts;
    }
    return null;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {filterProducts() ? (
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
        <h3>Empty Booth</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default ProductListPreview;
