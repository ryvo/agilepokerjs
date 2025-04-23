import React, { useState } from 'react';
import './RoomList.css';
import { createRoom, updateRoom, deleteRoom, fetchRoomList } from '../slices/roomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Card, Col, Table } from 'react-bootstrap';
import DateTimeComponent from './DateTimeComponent';
import { Pencil, Trash3 } from 'react-bootstrap-icons';
import NewRoomButton from './NewRoomButton';
import { usePopup } from './PopupProvider';
import RoomPopup from './RoomPopup';
import { POPUP_ID as CONFIRMATION_POPUP_ID } from './ConfirmationPopup';
import { POPUP_ID as ROOM_POPUP_ID } from './RoomPopup';
import { useNavigate } from 'react-router';

export default function RoomList() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms?.rooms)
  const { openPopup }  = usePopup();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRoomList());
  }, [dispatch]);

  const handleRoomDeletionConfirmation = async (room) => {
    await dispatch(deleteRoom(room.id));
    await dispatch(fetchRoomList());
  }

  const handleClickDeleteRoom = async (e, room) => {
    e.stopPropagation();
    openPopup(
      CONFIRMATION_POPUP_ID,
      {
        title: "Confirm room deletion",
        message: `Do you really want to delete room '${room.name}'?`,
      },
      room,
      handleRoomDeletionConfirmation,
    );
  };

  const handleRoomUpdateConfirmation = async (room) => {
    await dispatch(updateRoom(room));
    await dispatch(fetchRoomList());
  }

  const handleClickEditRoom = async (e, room) => {
    e.stopPropagation();
    openPopup(
      ROOM_POPUP_ID,
      {
        title: `Edit room '${room.name}'`,
      },
      room,
      handleRoomUpdateConfirmation,
    );
  };

  const handleClickRoomRow = (e, room) => {
    e.stopPropagation();
    // alert(room.name);
    navigate(`/room/${room.id}`);
  }

  return (
    <>
      <RoomPopup />
      <Card>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <h2>Your rooms</h2>
              </Col>
            </Row>
            <Row className="form-create-room">
              <Col sm={10}>
              </Col>
              <Col sm={2}>
                <NewRoomButton />
              </Col>
            </Row>
            <Row>
              <Col>
                <Table hover>
                  <thead>
                    <tr>
                      <th className="column-name">Name</th>
                      <th className="column-last-used-time">Created</th>
                      <th className="column-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {rooms?.map((room) => (
                    <tr key={room.id} onClick={(e) => handleClickRoomRow(e, room)}>
                      <td className="column-name">{room.name}</td>
                      <td className="column-last-used-time"><DateTimeComponent dateTimeStr={room.lastUsedDateTime} /></td>
                      <td className="column-actions">
                        <span onClick={(e) => handleClickEditRoom(e, room)}><Pencil/></span>
                        <span onClick={(e) => handleClickDeleteRoom(e, room)}><Trash3/></span>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
       </Card.Body>
      </Card>
    </>
  );
}