import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USERS, UPDATE_USER_PROFILE } from "../utils/actions";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import BoothCreateModal from "../components/BoothCreateModal";
import BoothListModal from "../components/BoothListModal";
import OrderListModal from "../components/OrderListModal";
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
  Modal,
} from "react-bootstrap";

const UserProfile = () => {
  const { loading, error, data } = useQuery(QUERY_USER, {});

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { users } = state;
  const [boothModalShow, setBoothModalShow] = useState(false);
  const [boothCreateModalShow, setBoothCreateModalShow] = useState(false);
  const [orderModalShow, setOrderModalShow] = useState(false);

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
      {console.log(users)}
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
                <Button onClick={() => setBoothCreateModalShow(true)}>
                  Create Booth
                </Button>
                <div className="vr" />
                <Button onClick={() => setBoothModalShow(true)}>
                  View Booths
                </Button>
                <div className="vr" />
                <Button onClick={() => setOrderModalShow(true)}>
                  View Recent Orders
                </Button>
              </Stack>
            </Col>
          </Row>
        </Container>
      ) : (
        <h3>error</h3>
      )}
      <Cart />
      <BoothCreateModal
        userid={users?._id || null}
        show={boothCreateModalShow}
        onHide={() => setBoothCreateModalShow(false)}
      />
      <BoothListModal
        show={boothModalShow}
        onHide={() => setBoothModalShow(false)}
        booths={users?.boothsOwned || null}
      />
      <OrderListModal
        show={orderModalShow}
        onHide={() => setOrderModalShow(false)}
        orders={users?.orders || null}
      />
    </>
  );
};

export default UserProfile;
