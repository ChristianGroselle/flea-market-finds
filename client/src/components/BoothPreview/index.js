import React, { useEffect } from "react";
import {
  Card,
  CardGroup,
  Col,
  Row,
  Container,
  Button,
  Stack,
} from "react-bootstrap";
import ProductItem from "../ProductItemLegacy";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import ProductList from "../ProductListLegacy";
import { Link } from "react-router-dom";

import ProductListPreview from "../ProductListPreview";
console.log("preview");

const BoothPreview = ({ id, name }) => {
  return (
    <>
      <Container>
        <Card style={{ height: "100%", width: "100%" }}>
          <Card.Header style={{ textAlign: "left" }} as="h3">
            <Stack direction="horizontal" gap={3}>
              <div>{name}</div>
              <div className="vr" />
              <Link className="btn btn-primary" to={"/booth/" + id}>
                Visit
              </Link>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Row>
              <ProductListPreview id={id} />
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default BoothPreview;
