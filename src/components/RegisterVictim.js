// src/components/RegisterVictim.js
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Form, Button } from 'react-bootstrap';
import '../styles/RegisterVictim.css';


function RegisterVictim() {
  const [shelters, setShelters] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [shelterId, setShelterId] = useState('');
  const [health_condition, setHealthCondition] = useState('');
  const [persnoal_number, setPersonalNumber] = useState('');
  const [emergency_contact, setEmergencyContact] = useState('');
  const [aadhaar_number, setAadhaarNumber] = useState('');

  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:8000/data/shelters/')
      .then(response => setShelters(response.data))
      .catch(error => console.error('Error fetching shelters:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/data/new_victim/', {
      name: name,
      age: age,
      gender: gender,
      shelter: shelterId,
      health_condition: health_condition,
      personal_number: persnoal_number,
      emergency_contact: emergency_contact,
      aadhaar_number: aadhaar_number
    }, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(() => {
      alert('Victim registered successfully');
      setName('');
      setAge('');
      setGender('');
      setShelterId('');
      setAadhaarNumber('');
      setPersonalNumber('');
      setEmergencyContact('');
      setHealthCondition('');

    })
    .catch(error => console.error('Error registering victim:', error));
  };

  return (
    <div className="register-victim">
      <h2>Register Victim</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" value={age} onChange={e => setAge(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" value={gender} onChange={e => setGender(e.target.value)} required>
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Health Condition</Form.Label>
          <Form.Control as="textarea" value={health_condition} onChange={e => setHealthCondition(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Personal Number</Form.Label>
          <Form.Control type="number" value={persnoal_number} onChange={e => setPersonalNumber(e.target.value)} required  />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Emergency Contact</Form.Label>
          <Form.Control type="number" value={emergency_contact} onChange={e => setEmergencyContact(e.target.value)}  />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Aadhaar Number</Form.Label>
          <Form.Control type="number" value={aadhaar_number} onChange={e => setAadhaarNumber(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Shelter</Form.Label>
          <Form.Control as="select" value={shelterId} onChange={e => setShelterId(e.target.value)} required>
            <option value="">Select Shelter</option>
            {shelters.map(shelter => (
              <option key={shelter.id} value={shelter.id}>{shelter.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        
        <Button type="submit" variant="primary">Register</Button>
      </Form>
    </div>
  );
}

export default RegisterVictim;