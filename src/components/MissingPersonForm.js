import { useState } from 'react';
import axios from 'axios';
import '../styles/MissingPersonForm.css';

function MissingPersonForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  // const [description, setDescription] = useState('');
  const [health_condition, setHealthCondition] = useState('');
  const [person_phone_number, setPersonalNumber] = useState('');
  const [person_to_contact, setEmergencyContact] = useState('');
  const [aadhaar_number, setAadhaarNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/data/missing_person/', {
        name,
        age,
        gender,
        last_known_location: location,
        person_phone_number,
        person_to_contact,
        aadhaar_number,
        health_condition
      });
      alert('Missing person reported successfully');
      setName('');
      setAge('');
      setGender('');
      setLocation('');
      // setDescription('');
      setAadhaarNumber('');
      setPersonalNumber('');
      setEmergencyContact('');
      setHealthCondition('');

    } catch (error) {
      console.error('Error reporting missing person:', error);
    }
  };

  return (
    <div className="missing-person-form">
      <div className="card">
        <div className="card-header">
          <i className="fas fa-user-plus"></i> Report Missing Person
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-label="Name of missing person"
              />
            </label>
            <label className="mt-3">
              Age:
              <input
                type="number"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                aria-label="Age of missing person"
              />
            </label>
            <label className="mt-3">
              Gender:
              <select
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                aria-label="Gender of missing person"
              >
                <option value="">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </label>
            <label className="mt-3">
              Last Known Location:
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                aria-label="Last known location"
              />
            </label>
            <label className="mt-3">
              Health Condition:
              <textarea
                className="form-control"
                value={health_condition}
                onChange={(e) => setHealthCondition(e.target.value)}
                required
                aria-label="Description of missing person"
              ></textarea>
            </label>
            <label className="mt-3">
              Personal Number:
              <input
                type="number"
                className="form-control"
                value={person_phone_number}
                onChange={(e) => setPersonalNumber(e.target.value)}
                required
                aria-label="Personal phone number"
              />
            </label>
            <label className="mt-3">
              Person to Contact:
              <input
                type="number"
                className="form-control"
                value={person_to_contact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                aria-label="Emergency contact number"
              />
            </label>
            <label className="mt-3">
              Aadhaar Number:
              <input
                type="number"
                className="form-control"
                value={aadhaar_number}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                aria-label="Aadhaar number"
              />
            </label>
            <button type="submit" className="btn mt-3" aria-label="Submit Report">
              <i className="fas fa-paper-plane"></i> Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MissingPersonForm;