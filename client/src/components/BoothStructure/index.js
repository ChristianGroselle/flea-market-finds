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
import BoothPreview from "../BoothPreview";
import {
  Card,
  CardGroup,
  Col,
  Row,
  Container,
  Button,
  Stack,
} from "react-bootstrap";
function BoothStructure() {
  const { loading, error, data } = useQuery(QUERY_BOOTHS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.log("data", data);
  console.log("structure");
  return (
    <>
      {data.booths.map((booth) => (
        <Col key={`booth-${booth._id}`} xl="4" md="6" sm="12">
          <BoothPreview
            key={`booth-preview-${booth._id}`}
            id={booth._id}
            name={booth.boothName}
          />
        </Col>
      ))}
    </>
  );
}

export default BoothStructure;
