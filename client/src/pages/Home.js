import React from "react";
import BoothPreview from "../components/BoothPreview";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

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
  return (
    <Container>
      <Row>
        <Col xl="3" md="6" sm="12">
          <BoothPreview />
        </Col>
      </Row>
      <Cart />
    </Container>
  );
};

export default Home;
