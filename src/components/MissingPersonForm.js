// src/components/MissingPersonForm.js
import { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import '../styles/MissingPersonForm.css';

function MissingPersonForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  
  const [health_condition, setHealthCondition] = useState('');
  const [person_contact_number, setPersonContactNumber] = useState('');
  const [persont_to_contact, setPersonToContact] = useState('');
  const [aadhaar_number, setAadhaarNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/data/missing_person/', {
      'name' : name,
      'age' : age,
      gender : gender,
      last_known_location: location,
      health_condition: health_condition,
      person_contact_number: person_contact_number,
      person_to_contact: persont_to_contact,
      aadhaar_number: aadhaar_number,
      
    })
    .then(() => {
      alert('Missing person reported successfully');
      setName('');
      setAge('');
      setGender('');
      setLocation('');
      setHealthCondition('');
      setPersonContactNumber('');
      setPersonToContact('');
      setAadhaarNumber('');
    })
    .catch(error => console.error('Error reporting missing person:', error));
  };

  return (
    // <div className="container mt-4">
    <div className="missing-person-form">
      <h2>Report Missing Person</h2>
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
          <Form.Label>Last Known Location</Form.Label>
          <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Health Condition</Form.Label>
          <Form.Control as="textarea" value={health_condition} onChange={e => setHealthCondition(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Missing Person Contact Number</Form.Label>
          <Form.Control type="text" value={person_contact_number} onChange={e => setPersonContactNumber(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Missing Person Aadhar Number</Form.Label>
          <Form.Control type="text" value={aadhaar_number} onChange={e => setAadhaarNumber(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Your Contact Number</Form.Label>
          <Form.Control type="text" value={persont_to_contact} onChange={e => setPersonToContact(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    </div>
  );
}

export default MissingPersonForm;