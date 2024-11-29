import './RoomList.css';
import { fetchRoomList } from '../slices/roomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Card, Col, Table } from 'react-bootstrap';
import DateTimeComponent from './DateTimeComponent';
import { Pencil, Trash3 } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function RoomList() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room?.rooms)

  useEffect(() => {
    dispatch(fetchRoomList());
  }, [dispatch]);

  return (
    <Card>
      <Card.Body>
        <Card.Text>
          <Container>
            <Row>
              <Col>
                <h2>Your rooms</h2>
              </Col>
            </Row>
            <Row className="form-create-room">
              <Col sm={8}>
                <Form.Control type="text" />
              </Col>
              <Col sm={4}>
                <Button variant="primary">Create room</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {rooms?.map((room) => (
                    <tr>
                      <td>{room.id}</td>
                      <td>{room.name}</td>
                      <td><DateTimeComponent dateTimeStr={room.lastUsedDateTime} /></td>
                      <td class="column-actions"><Pencil /><Trash3 /></td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}