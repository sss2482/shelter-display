// src/components/VolunteerLogin.js
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useHistory, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../styles/VolunteerLogin.css';

function VolunteerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/users/token/', { username: username, password: password })
      .then(response => {
        setToken(response.data.token);
        console.log(response);
        navigate('/volunteer/dashboard');
      })
      .catch(error => console.error('Login failed:', error));
  };

  return (
    <div className="volunteer-login">
    <div className="container mt-4">
      <h2>Volunteer Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="primary">Login</Button>
      </Form>
    </div>
    </div>
  );
}

export default VolunteerLogin;