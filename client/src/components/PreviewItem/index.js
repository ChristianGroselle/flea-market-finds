import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import {
  Card,
  CardGroup,
  Col,
  Row,
  Container,
  Button,
  Stack,
  Image,
  OverlayTrigger,
} from "react-bootstrap";

function PreviewItem(item) {
  // const [state, dispatch] = useStoreContext();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [showOverlay, setShowOverlay] = useState(false);

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const handleMouseOver = () => {
    setShowOverlay(true);
  };

  const handleMouseOut = () => {
    setShowOverlay(false);
  };

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
    <>
      <Col xs={12} sm={12} md={6}>
        <Card style={{ height: "100%", width: "100%" }}>
          <Card.Img src={`/images/${image}`} alt={name} />
        </Card>
      </Col>
    </>
  );
}

export default PreviewItem;
