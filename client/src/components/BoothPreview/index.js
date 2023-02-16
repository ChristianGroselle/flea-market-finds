import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import ProductItem from "../ProductItemLegacy";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import ProductList from "../ProductListLegacy";

const BoothPreview = () => {
  return (
    <>
      <Card>
        <Card.Body>This is some text within a card body.</Card.Body>
      </Card>
    </>
  );
};

export default BoothPreview;
