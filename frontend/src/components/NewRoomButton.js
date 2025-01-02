// import PropTypes from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { createRoom, fetchRoomList } from '../slices/roomSlice';

export default function NewRoomButton() {
  const dispatch = useDispatch()
  const [isShow, setIsShown] = useState(false);
  const [roomName, setRoomName] = useState();

  const handleShowModal = () => setIsShown(true);
  const handleCloseModal = () => setIsShown(false);
  const handleChangeName = (e) => setRoomName(e.target.value);
  const handleCreateRoom = async () => {
    await dispatch(createRoom(roomName));
    await dispatch(fetchRoomList());
    handleCloseModal();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>Create new room</Button>
      <Modal show={isShow} onHide={handleCloseModal} backdrop="static" keyboard="false">
        <Modal.Header closeButton>
          <Modal.Title>Create new room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Label>Group name</Form.Label>
              <Form.Control type="text" placeholder="" onChange={handleChangeName}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateRoom}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

NewRoomButton.propTypes = {
};