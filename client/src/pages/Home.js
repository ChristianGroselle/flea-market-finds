import React from "react";
import BoothPreview from "../components/BoothPreview";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import { useQuery } from "@apollo/client";
import { QUERY_BOOTHS } from "../utils/queries";

import ProductListPreview from "../components/ProductListPreview";

import {
  Card,
  CardGroup,
  Col,
  Row,
  Container,
  Button,
  Stack,
} from "react-bootstrap";

const Home = () => {
  const allBooth = useQuery(QUERY_BOOTHS);
  console.log(allBooth);
  return (
    <Container>
      <Row>
        {allBooth.loading == false &&
          allBooth.data.booths.map((booth) => {
            return (
              <Col xl="4" md="6" sm="12">
                <BoothPreview booth={booth} />
              </Col>
            );
          })}
      </Row>
      <Cart />
    </Container>
  );
};

export default Home;
