import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USERS, UPDATE_USER_PROFILE } from "../utils/actions";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import { idbPromise } from "../utils/helpers";
import { useQuery } from "@apollo/client";
import { QUERY_BOOTH, QUERY_USER, USER_BOOTHS } from "../utils/queries";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Stack,
  Button,
} from "react-bootstrap";

const UserProfile = () => {
  const { loading, error, data } = useQuery(QUERY_USER, {});

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { users } = state;
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_USER_PROFILE,
        userData: data.user,
      });
      idbPromise("users", "put", data.user);
    } else if (!loading) {
      idbPromise("users", "get").then((user) => {
        dispatch({
          type: UPDATE_USER_PROFILE,
          userData: user,
        });
      });
    }
  }, [data, loading, dispatch]);

  const navigate = useNavigate();

  // display array of products ordered:
  // const ordersArray = () => {
  //     user.orders[0].map((product) => (
  //     <li key={user.orders._id}>
  //         {product.name} - {product.price}
  //     </li>
  //     ));
  // }

  // console.log(ordersArray);

  const navigateToBooth = () => {
    navigate("/");
  };

  const createBooth = () => {
    navigate("/boothCreation");
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }
  return (
    <>
      {users ? (
        <Container className="d-flex justify-content-center align-items-center mt-4">
          <Row className="text-center">
            <Col>
              <Image
                src="https://via.placeholder.com/150"
                roundedCircle
                alt="User Avatar"
              />
              <h1>{users.username}</h1>
              <small>
                {users.firstName} {users.lastName}
                <br />
              </small>

              <hr />
              <ListGroup variant="flush">
                <ListGroup.Item>Email: {users.email}</ListGroup.Item>
                <ListGroup.Item>Member since: {users.createdAt}</ListGroup.Item>
                <ListGroup.Item className="text-muted">
                  <small>user id: {users._id}</small>
                </ListGroup.Item>
              </ListGroup>
              <Stack direction="horizontal" gap={3} className="mx-auto">
                <Button>View Booths</Button>
                <div className="vr" />
                <Button>View Recent Orders</Button>
              </Stack>
            </Col>
          </Row>
        </Container>
      ) : (
        <h3>error</h3>
      )}
      <Cart />
    </>
  );
};

export default UserProfile;

{
  /* <div className="userProfile container my-1">
        {user ? (
          <>
            <h2>
              {user.firstName} {user.lastName}
            </h2>

            <h4>User Profile Info</h4>
            <ul>
              <li>_id: {user._id}</li>
              <li>Username: {user.username}</li>
              <li>Email: {user.email}</li>
              <li>Created At: {user.createdAt}</li>

              <li>
                Orders PurchasedAt (Work in Progress):
                {user.orders[0] !== undefined
                  ? user.orders[0].purchaseDate
                  : ""}
              </li>
              {/* <li>
              Orders Products (Work in Progress):{" "}
              {user.orders[0] !== undefined
                ? user.orders[0].products[0].name
                : ""}
              </li> */
}
{
  /* <li>
                {user.orders.map((order) => {
                  return (
                    <p key={order._id}>
                      {order.products.map((product) => {
                        return (
                          <span key={product._id}>
                            {product.name} - {product.price}
                          </span>
                        );
                      })}
                    </p>
                  );
                })}
              </li>
              <li>Booths Owned (Work in Progress): {user.boothsOwned}</li>
              {/* <li>Booths Managing (Work in Progress): {user.boothsManaging}</li> */
}
{
  /*} </ul>

            <h4>User Profile Functions</h4>

            <button onClick={navigateToBooth}>Go to Booth</button>

            <button onClick={createBooth}>Booth Creation</button>
          </>
        ) : null}
      </div> */
}
