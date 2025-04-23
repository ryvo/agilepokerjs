import React, { createContext, useContext, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { usePopup } from './PopupProvider';
import PropTypes from 'prop-types';

const Popup = (id, title, children) => {
  const { getPopupState, openPopup, closePopup, confirmAndClosePopup } = usePopup();

  const handleConfirm = () => {
    popupState.onConfirm();
  }

  const handleCancel = (popupId) => {
    closePopup();
  }

  const popupState = getPopupState
  return (
    <Modal show={popupState.isVisible} backdrop="static" keyboard="false">
      <Modal.Header>
        <Modal.Title>{popupState.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Label>{popupState.message}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm()}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}

Popup.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.object,
}

export default Popup;