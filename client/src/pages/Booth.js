import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import CategoryDropDown from "../components/CategoryDropDown";
import Cart from "../components/Cart";
// import { useStoreContext } from '../utils/GlobalState';
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";

import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { idbPromise } from "../utils/helpers";

import { QUERY_BOOTH_WITH_PRODUCTS } from "../utils/queries";

import TestComp from "../components/TestComp";

const Booth = () => {
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_BOOTH_WITH_PRODUCTS, {
    variables: { id },
  });

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);
  console.log("data", data);
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleProductClick = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Booth Name</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search products"
                value={searchText}
                onChange={handleSearchChange}
              />
            </Form>
            <CategoryDropDown />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <ProductList id={id} searchText={searchText} />
        <Cart />
      </Container>
    </>
  );
};

export default Booth;
