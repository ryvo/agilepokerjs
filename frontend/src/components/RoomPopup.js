import Button from 'react-bootstrap/Button';
import { Modal, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useRef, useState } from 'react';
import { usePopup } from './PopupProvider';

export const POPUP_ID = 'room';

const RoomPopup = () => {
  const [name, setName] = useState('');
  const {getPopupState, closePopup, confirmAndClosePopup} = usePopup();
  const inputRef = useRef();
  const popupState = getPopupState(POPUP_ID);
  const options = popupState?.options;
  const title = options?.title || 'Confirmation';
  const isVisible = popupState?.isVisible || false;
  const isLoading = popupState?.isLoading || false;
  const data = popupState?.data || {};
  const initialName = data.name || '';

  useEffect(() => {
    if (isVisible) {
      setName(initialName);
    }
  }, [isVisible, initialName]);

  const handleConfirm = () => {
    const data = {
      ...(getPopupState(POPUP_ID)?.data || {}),
      name,
    }
    confirmAndClosePopup(POPUP_ID, data);
  }

  const handleCancel = () => {
    closePopup(POPUP_ID);
  }

  const handleOnShow = () => {
    // Attribute "autoFocus" doesn't work on Form.Control if animations are enabled
    // hence it needs to be done this way.
    inputRef.current?.focus();
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  return (
    <Modal show={isVisible} onShow={handleOnShow} backdrop="static" keyboard="false">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Label>Group name</Form.Label>
            <Form.Control type="text" placeholder="" value={name} ref={inputRef} onChange={handleChangeName} disabled={isLoading} />
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

export default RoomPopup;