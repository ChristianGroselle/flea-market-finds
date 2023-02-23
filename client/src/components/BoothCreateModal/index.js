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
  Form,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const BoothCreateModal = (props) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
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
            New Booth
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Booth Name"
                  className="mb-3"
                >
                  <Form.Control required type="text" placeholder="Booth Name" />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Booth Description"
                  className="mb-3"
                >
                  <Form.Control required type="text" placeholder="Booth Name" />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Button type="submit">Submit Booth</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BoothCreateModal;
