import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import CategoryDropDown from "../components/CategoryDropDown";
import Cart from "../components/Cart";
import { UPDATE_USER_PROFILE } from "../utils/actions";
// import { useStoreContext } from '../utils/GlobalState';
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
  UPDATE_BOOTHS,
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

import {
  QUERY_BOOTH_WITH_PRODUCTS,
  QUERY_BOOTHS,
  QUERY_USER,
} from "../utils/queries";

const Booth = () => {
  const [searchText, setSearchText] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let { id } = useParams();
  id = id.trim();
  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_BOOTHS);
  const { data: userData } = useQuery(QUERY_USER);

  const { users, products, booths, cart } = state;

  useEffect(() => {
    if (data) {
      const boothData = data.booths;
      dispatch({
        type: UPDATE_BOOTHS,
        booths: boothData,
      });
      boothData.forEach((booth) => {
        console.log("data", boothData);
        console.log("booth", booth);
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

  useEffect(() => {
    if (userData) {
      dispatch({
        type: UPDATE_USER_PROFILE,
        userData: userData.user,
      });
      idbPromise("users", "put", userData.user);
    } else if (!loading) {
      idbPromise("users", "get").then((user) => {
        dispatch({
          type: UPDATE_USER_PROFILE,
          userData: user,
        });
      });
    }
  }, [userData, loading, dispatch]);
  console.log("data", userData);
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  let thisBooth = {};
  booths.forEach((booth) => {
    if (booth._id == id) {
      console.log("FilBooth", booth);
      thisBooth = booth;
    }
  });
  const ownerTest = users?.boothsOwned?.filter(
    (booth) => booth == thisBooth?._id
  );

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">{thisBooth.boothName}</Navbar.Brand>
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
        {ownerTest ? <h1>Is Owner</h1> : <p>Not Owner</p>}
        <ProductList id={id} searchText={searchText} />
        <Cart />
      </Container>
    </>
  );
};

export default Booth;
