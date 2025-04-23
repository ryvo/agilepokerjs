import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { createRoom, fetchRoomList } from '../slices/roomSlice';
import { POPUP_ID } from './RoomPopup';
import { usePopup } from './PopupProvider';

export default function NewRoomButton() {
  const dispatch = useDispatch()
  const { openPopup }  = usePopup();

  const handleRoomCreationConfirmation = async (room) => {
    await dispatch(createRoom(room));
    await dispatch(fetchRoomList());
  }

  const handleClickCreateRoom = async (e) => {
    e.stopPropagation();
    openPopup(
      POPUP_ID,
      {
        title: "Create new room",
      },
      undefined,
      handleRoomCreationConfirmation,
    );
  };

  return (
    <Button variant="primary" onClick={handleClickCreateRoom}>Create new room</Button>
  );
}
