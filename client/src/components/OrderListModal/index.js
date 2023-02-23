import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Stack,
  Button,
  Modal,
} from "react-bootstrap";

const OrderListModal = (props) => {
  let orders = [];
  if (props.orders) {
    orders = props.orders;
  }
  let products = [];
  if (props.products) {
    products = props.products;
  }
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Your Booths:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orders.length > 0 ? (
            <ListGroup variant="flush">
              {orders.map((order) => (
                <ListGroup.Item key={order._id}>
                  <Stack direction="horizontal" gap={3}>
                    <div>order id: {order._id}</div>
                    <div className="mx-auto">
                      Date:
                      {new Date(
                        parseInt(props.purchaseDate)
                      ).toLocaleDateString()}
                    </div>
                  </Stack>
                  <ListGroup>
                    {products.forEach((product) => {
                      <ListGroup.Item key={order._id + "+" + { product }}>
                        {product}
                      </ListGroup.Item>;
                    })}
                    ;
                  </ListGroup>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <h3>No orders Found</h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderListModal;
