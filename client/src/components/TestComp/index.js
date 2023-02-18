import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { QUERY_BOOTH_WITH_PRODUCTS } from "../../utils/queries";

function TestComp({ _id }) {
  const { loading, error, data } = useQuery(QUERY_BOOTH_WITH_PRODUCTS, {
    variables: { _id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.log("data: ", data);
  const boothData = data.boothWithProducts;
  const productArr = boothData.product;

  return (
    <>
      <h2>{data.boothName}</h2>
      <p>{data.description}</p>
      {productArr.map((products) => (
        <div key={products._id}>
          <h3>{products.name}</h3>
          <p>{products.description}</p>
          {/* <img src={product.image} alt={product.name} /> */}
          <p>Price: ${products.price}</p>
        </div>
      ))}
    </>
  );
}

export default TestComp;
