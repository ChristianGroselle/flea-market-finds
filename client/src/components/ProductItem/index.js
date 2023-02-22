import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductItem(item) {
  // const [state, dispatch] = useStoreContext();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { image, name, _id, price, quantity } = item;

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

  return (
    <Card
      className="text-center"
      style={{ marginTop: "1rem", marginBottom: "1rem" }}
    >
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        <Card.Title>${price}</Card.Title>
        <Card.Img src={`/images/${image}`} alt={name} />
        <Card.Body>
          <p>Short Description.</p>
          <hr />
          <p>
            {quantity} {pluralize("item", quantity)} in stock
          </p>
        </Card.Body>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Button variant="primary">Add to cart</Button>
      </Card.Footer>
    </Card>
  );
}

export default ProductItem;
