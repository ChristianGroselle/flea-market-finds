import React from "react";
import BoothPreview from "../components/BoothPreview";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import { useQuery } from "@apollo/client";
import { QUERY_BOOTHS } from "../utils/queries";

import ProductListPreview from "../components/ProductListPreview";

import TestComp from "../components/TestComp";
import BoothStructure from "../components/BoothStructure";

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
        <BoothStructure />
      </Row>
      {/* <Cart /> */}
    </Container>
  );
};

export default Home;
