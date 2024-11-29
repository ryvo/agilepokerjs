import './Registration.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../slices/userSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import LocalStorageService from '../service/LocalStorageService';

export default function Registration() {
  const [username, setUsername] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(username)).then((data) => {
      LocalStorageService.setCurrentUser(data.payload);
      navigate("/");
    });
  };

  return (
    <Container id="registration-form" className="w-50 text-center">
      <Form className="align-items-center">
        <Form.Group className="mb-4">
          <h1>Registration</h1>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>What's your name?</Form.Label>
          <Form.Control onChange={(e) => setUsername(e.target.value)}/>
        </Form.Group>
        <Button type="submit" onClick={(e) => onSubmitHandler(e)}>Register</Button>
      </Form>
    </Container>
  );
}