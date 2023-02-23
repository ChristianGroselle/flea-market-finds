import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import { Modal, Button, Card, Stack } from "react-bootstrap";

function ProductItem(item) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // const [state, dispatch] = useStoreContext();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { image, name, _id, price, quantity, description } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={`/images/${image}`} alt={name} />
          <p>Description: {description}</p>
          <hr />
          <p> Price: ${price}</p>
          <p>Quantity: {quantity}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={addToCart}>
            Add to Cart
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Card
        className="text-center"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <Card.Header as="h5">{name}</Card.Header>
        <Card.Body>
          <Card.Title>${price}</Card.Title>
          <Card.Img src={`/images/${image}`} alt={name} />
          <Card.Body>
            <hr />
            <p>
              {quantity} {pluralize("item", quantity)} in stock
            </p>
          </Card.Body>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Stack gap={2}>
            <Button
              onClick={() =>
                handleProductClick({ _id, image, name, price, quantity })
              }
            >
              View Details
            </Button>
            <Button variant="primary" onClick={addToCart}>
              Add to cart
            </Button>
          </Stack>
        </Card.Footer>
      </Card>
    </>
  );
}

export default ProductItem;
