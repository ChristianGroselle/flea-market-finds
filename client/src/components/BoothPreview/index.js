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

const BoothPreview = (props) => {
  return (
    <>
      <Container>
        <Card style={{ height: "100%", width: "100%" }}>
          <Card.Header style={{ textAlign: "left" }} as="h3">
            <Stack direction="horizontal" gap={3}>
              <div>{props.booth.boothName}</div>
              <div className="vr" />
              <Link
                className="btn btn-primary"
                to={"/booth/" + props.booth._id}
              >
                Visit
              </Link>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Row xs={1} sm={2} md={4}>
              {/* {Array.from({ length: 1 }).map((_, idx) => ( */}
              {/* <Col key={idx} xs={12} sm={6} md={3}> */}
              {/* <Card style={{ height: "100%", width: "100%" }}>
                    <Card.Header as="h5">Product {idx + 1}</Card.Header>
                    <Card.Body>
                      <Card.Img src={`/images/camera.jpg`} alt={`name`} />
                    </Card.Body>
                  </Card> */}
              <ProductListPreview />
              {/* </Col> */}
              {/* ))} */}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default BoothPreview;
