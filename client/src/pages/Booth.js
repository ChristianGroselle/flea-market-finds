import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryDropDown from "../components/CategoryDropDown";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Booth = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
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
        <ProductList searchText={searchText} />
      </Container>
    </>
  );
};

export default Booth;
