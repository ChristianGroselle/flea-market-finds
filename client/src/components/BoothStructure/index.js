import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_BOOTHS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { QUERY_BOOTHS } from "../../utils/queries";
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
  const { loading, error, data } = useQuery(QUERY_BOOTHS, {});
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { products, booths, currentCategory } = state;
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {booths.map((booth) => (
        <Col key={`booth-${booth._id}`} md="6" sm="12">
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
