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
import { Link } from "react-router-dom";

const BoothListModal = (props) => {
  let booths = [];
  if (props.booths) {
    booths = props.booths;
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
          {booths.length > 0 ? (
            <ListGroup variant="flush">
              {booths.map((booth) => (
                <ListGroup.Item key={booth._id}>
                  <Stack direction="horizontal" gap={3}>
                    <div>{booth.boothName}</div>
                    <Link
                      className="btn btn-primary"
                      to={"/booth/" + booth._id}
                    >
                      Visit
                    </Link>
                  </Stack>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <h3>No Booths Found</h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BoothListModal;
