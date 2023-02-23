import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_BOOTH } from "../../utils/mutations";
import { QUERY_BOOTH_BY_IDS, QUERY_USER } from "../../utils/queries";
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
  let boothIds = [];
  if (props.booths) {
    booths = props.booths;
  }
  booths.forEach((booth) => {
    boothIds.push(booth._id);
  });
  const { loading, error, data } = useQuery(QUERY_BOOTH_BY_IDS, {
    variables: { ids: boothIds },
  });

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [boothToDelete, setBoothToDelete] = useState(null);

  const customMergeBoothsOwned = (existing, incoming) => {
    // Define a custom merge function for the boothsOwned field
    const merged = existing.filter((x) => {
      // Check if incoming objects are already in the cache
      const match = incoming.find((y) => y.__ref === x.__ref);
      return !match;
    });
    // Merge the existing array with the incoming array
    return merged.concat(incoming);
  };

  const [deleteBooth] = useMutation(DELETE_BOOTH, {
    update(cache, { data: { deleteBooth } }) {
      // Remove the deleted booth from the cache
      const { user } = cache.readQuery({ query: QUERY_USER });
      cache.writeQuery({
        query: QUERY_USER,
        data: {
          user: {
            ...user,
            boothsOwned: customMergeBoothsOwned(user.boothsOwned, [
              deleteBooth,
            ]),
          },
        },
      });
    },
  });

  const handleDeleteBooth = (booth) => {
    // Set the booth to delete and show the confirmation modal
    setBoothToDelete(booth);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    if (boothToDelete) {
      // Call the deleteBooth mutation with the booth's _id
      deleteBooth({ variables: { _id: boothToDelete._id } });
      // Reset the boothToDelete and hide the confirmation modal
      setBoothToDelete(null);
      setShowConfirmDelete(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  booths = data.boothsByIds;

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
          {console.log(booths)}
          {booths.length > 0 ? (
            <ListGroup variant="flush">
              {booths.map((booth) => (
                <ListGroup.Item key={booth._id}>
                  <Stack direction="horizontal" gap={3}>
                    <div>{booth.boothName}</div>
                    <Link
                      className="btn btn-primary ms-auto"
                      to={"/booth/" + booth._id}
                    >
                      Visit
                    </Link>
                    <div className="vr" />
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteBooth(booth)}
                    >
                      Delete Booth
                    </Button>
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
      <Modal
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the booth?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDelete(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BoothListModal;
