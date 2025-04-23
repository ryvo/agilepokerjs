import Button from 'react-bootstrap/Button';
import { Modal, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ConfirmModal({isShown, isLoading, handleOk, handleCancel, title, message, cancelButtonTitle, okButtonTitle}) {
  const [roomName, setRoomName] = useState();

  const handleOkInternal = () => {
    handleOk &&handleOk(roomName);
  }

  const handleCancelInternal = () => {
    handleCancel && handleCancel();
  }

  return (
    <Modal show={isShown} backdrop="static" keyboard="false">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Label>{message}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelInternal} disabled={isLoading}>
          {cancelButtonTitle || 'Cancel'}
        </Button>
        <Button variant="primary" onClick={handleOkInternal} disabled={isLoading}>
          { isLoading && <Spinner animation="border" role="status" size="sm" /> } {okButtonTitle || 'Ok'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  isShown: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
}