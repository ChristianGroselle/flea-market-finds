import React, { useEffect } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Booth = () => {
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
            >
              <NavDropdown title="Filter" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Food</NavDropdown.Item>

                <NavDropdown.Item href="#action4">
                  Household Supplies
                </NavDropdown.Item>

                <NavDropdown.Item href="#action5">Electronics</NavDropdown.Item>

                <NavDropdown.Item href="#action6">Books</NavDropdown.Item>

                <NavDropdown.Item href="#action7">Toys</NavDropdown.Item>

                <NavDropdown.Item href="#action7">None</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CategoryMenu />
      <ProductList />
    </>
  );
};

export default Booth;
