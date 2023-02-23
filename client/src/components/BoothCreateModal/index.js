import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { useDispatch } from "react-redux";
import { UPDATE_USER_BOOTHS_OWNED } from "../../utils/mutations";
import { ADD_BOOTH } from "../../utils/mutations";
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
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const BoothCreateModal = (props) => {
  const [validated, setValidated] = useState(false);
  const [boothName, setBoothName] = useState("");
  const [description, setBoothDescription] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [addBooth, { loading, error }] = useMutation(ADD_BOOTH);
  const [updateUserBoothOwned] = useMutation(UPDATE_USER_BOOTHS_OWNED);

  const toggleShowToast = () => setShowToast(!showToast);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    // Log the values of the form fields
    console.log("Booth Name: ", boothName);
    console.log("Booth Description: ", description);
    try {
      const { data } = await addBooth({
        variables: { boothName, description },
      });
      console.log("ThisData", data);
      const newBoothId = data.addBooth._id; // get the new booth's autogenerated _id
      await updateUserBoothOwned({
        variables: { userId: props.userid, boothId: newBoothId }, // update user's boothsOwned field with the new _id
      });
      toggleShowToast();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ToastContainer className="p-3" position="top-center">
        <Toast show={showToast} onClose={toggleShowToast}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Booth Added Successfully</strong>
          </Toast.Header>
          <Toast.Body>Woohoo, you added a Booth!</Toast.Body>
        </Toast>
      </ToastContainer>
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
          <Container>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
            >
              <InputGroup hasValidation className="mb-3">
                <InputGroup.Text id="basic-addon1">Booth Name</InputGroup.Text>
                <Form.Control
                  required
                  type="text"
                  placeholder="Booth Name"
                  aria-label="Booth Name"
                  onChange={(event) => setBoothName(event.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
              <InputGroup hasValidation className="mb-3">
                <InputGroup.Text>Booth Description</InputGroup.Text>
                <Form.Control
                  required
                  as="textarea"
                  aria-label="Booth Description"
                  onChange={(event) => setBoothDescription(event.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
              <Stack direction="horizontal" gap={3}>
                <Button type="submit" onClick={props.onHide}>
                  Submit Booth
                </Button>
                <Button onClick={props.onHide} className="ms-auto">
                  Close
                </Button>
              </Stack>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BoothCreateModal;