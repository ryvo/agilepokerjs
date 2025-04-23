import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { usePopup } from './PopupProvider';

export const POPUP_ID = 'confirm';

const ConfirmationPopup = () => {
  const { getPopupState, closePopup, confirmAndClosePopup } = usePopup();

  const handleConfirm = () => {
    const data = getPopupState(POPUP_ID)?.data;
    confirmAndClosePopup(POPUP_ID, data);
  }

  const handleCancel = () => {
    closePopup(POPUP_ID);
  }

  const popupState = getPopupState(POPUP_ID) || {};
  const options = popupState?.options;
  const title = options?.title || 'Confirmation';
  const message = options?.message || 'Do you really want to perform this action?';
  const isVisible = popupState.isVisible || false;
  const isLoading = popupState.isLoading || false;

  return (
    <Modal show={isVisible} backdrop="static" keyboard="false">
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
        <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm} disabled={isLoading}>
          { isLoading && <Spinner animation="border" role="status" size="sm" /> } OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationPopup;