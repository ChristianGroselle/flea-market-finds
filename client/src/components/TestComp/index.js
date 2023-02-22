import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { QUERY_BOOTH_WITH_PRODUCTS } from "../../utils/queries";
import { QUERY_BOOTHS } from "../../utils/queries";
import { QUERY_BOOTH } from "../../utils/queries";

function TestComp({ _id }) {
  const { loading, error, data } = useQuery(QUERY_BOOTHS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.log("data", data);
  console.log("databooth", data.booths);

  return (
    <div>
      {data.booths.map((booth) => (
        <div key={booth.id}>
          <h2>{booth.boothName}</h2>
          <p>{booth.description}</p>
          {booth.product.length > 0 &&
            booth.product.map((product) => (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default TestComp;
