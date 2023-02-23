import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryDropDown from "../components/CategoryDropDown";
import Cart from "../components/Cart";
import { useDispatch, useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_BOOTH_WITH_PRODUCTS, QUERY_USER } from "../utils/queries";

// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { idbPromise } from "../utils/helpers";

// import { QUERY_BOOTH_WITH_PRODUCTS } from "../utils/queries";

// import TestComp from "../components/TestComp";

const Booth = () => {
  // const [searchText, setSearchText] = useState("");
  // const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  // const { id } = useParams();

  // const [currentProduct, setCurrentProduct] = useState({});

  // const { loading, data } = useQuery(QUERY_BOOTH_WITH_PRODUCTS, {
  //   variables: { id },
  // });

  // const { products, cart } = state;

  let ownerId = null;
  const [searchText, setSearchText] = useState("");

  const { id } = useParams();

  const { loading, data } = useQuery(QUERY_BOOTH_WITH_PRODUCTS, {
    variables: { id },
  });

  const user = useQuery(QUERY_USER);
  let userData = {};

  if (data !== undefined && data.boothWithProducts.owner[0] !== undefined) {
    ownerId = data.boothWithProducts.owner[0]._id;
  }

  if (user.loading === false && user.data !== undefined) {
    userData = user.data.user;
  }

  // useEffect(() => {
  //   // already in global store
  //   if (products.length) {
  //     setCurrentProduct(products.find((product) => product._id === id));
  //   }
  //   // retrieved from server
  //   else if (data) {
  //     dispatch({
  //       type: UPDATE_PRODUCTS,
  //       products: data.products,
  //     });

  //     data.products.forEach((product) => {
  //       idbPromise("products", "put", product);
  //     });
  //   }
  //   // get cache from idb
  //   else if (!loading) {
  //     idbPromise("products", "get").then((indexedProducts) => {
  //       dispatch({
  //         type: UPDATE_PRODUCTS,
  //         products: indexedProducts,
  //       });
  //     });
  //   }
  // }, [products, data, loading, dispatch, id]);
  // console.log("data", data);
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Booth Name: </Navbar.Brand>
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
        {userData._id !== undefined && userData._id == ownerId && (
          <div className="mt-4 mb-4">
            <Link className="btn btn-primary" to={"/product-to-booth/" + id}>
              Add product to the Booth
            </Link>
          </div>
        )}

        <ProductList id={id} searchText={searchText} />
        <Cart />
      </Container>
    </>
  );
};

export default Booth;
