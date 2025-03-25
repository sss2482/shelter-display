import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Card } from 'react-bootstrap';
import '../styles/UpdateShelter.css';

function UpdateShelter() {
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false); // Toggle between update and add modes
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    max_capacity: '',
    members_in_shelter: '',
    space_remaining: '',
    isFull: false,
    medical_facilities_available: [],
    resources_available: [],
    latitude: '',
    longitude: '',
  });
  const [medicalFacilities, setMedicalFacilities] = useState([]); // Available options
  const [resources, setResources] = useState([]); // Available options
  const { token } = useContext(AuthContext);

  // Fetch shelters, medical facilities, and resources on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheltersResponse = await axios.get('http://localhost:8000/data/shelters/');
        setShelters(sheltersResponse.data);
        console.log(sheltersResponse.data);

        // Replace with actual endpoints for medical facilities and resources
        const medicalResponse = await axios.get('http://localhost:8000/data/medical_facilities/');
        setMedicalFacilities(medicalResponse.data);

        const resourcesResponse = await axios.get('http://localhost:8000/data/resources/');
        setResources(resourcesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  // Handle shelter selection
  const handleSelectShelter = (e) => {
    const shelterId = e.target.value;
    const shelter = shelters.find((s) => s.id === parseInt(shelterId));
    setSelectedShelter(shelter);
    setIsAddingNew(false);
    setFormData({
      name: shelter.name,
      location: shelter.location,
      max_capacity: shelter.max_capacity,
      members_in_shelter: shelter.members_in_shelter,
      space_remaining: shelter.space_remaining,
      isFull: shelter.isFull,
      medical_facilities_available: shelter.medical_facilities_available.map((mf) => mf.id),
      resources_available: shelter.resources_available.map((r) => r.id),
      latitude: shelter.latitude || '',
      longitude: shelter.longitude || '',
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (e, field) => {
    const options = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
    setFormData((prev) => ({
      ...prev,
      [field]: options,
    }));
  };

  // Handle form submission (update or add)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(token);

    try {
      if (isAddingNew) {
        // Add new shelter
        const response = await axios.post('http://localhost:8000/data/new_shelter/', formData);
        setShelters([...shelters, response.data]);
        alert('Shelter added successfully');
        resetForm();
      } else if (selectedShelter) {
        // Update existing shelter
        await axios.put(`http://localhost:8000/data/shelters/${selectedShelter.id}/`, formData);
        setShelters(shelters.map((s) => (s.id === selectedShelter.id ? { ...s, ...formData } : s)));
        alert('Shelter updated successfully');
      }
    } catch (error) {
      console.error('Error submitting shelter:', error);
      alert('Failed to submit shelter');
    }
  };

  // Reset form for adding new shelter
  const resetForm = () => {
    setSelectedShelter(null);
    setIsAddingNew(true);
    setFormData({
      name: '',
      location: '',
      max_capacity: '',
      members_in_shelter: '',
      space_remaining: '',
      isFull: false,
      medical_facilities_available: [],
      resources_available: [],
      latitude: '',
      longitude: '',
    });
  };

  return (
    <div className="update-shelter">
      <h2>{isAddingNew ? 'Add New Shelter' : 'Update Shelter'}</h2>
      <Card className="p-3">
        {!isAddingNew && (
          <Form.Group className="mb-3">
            <Form.Label>Select Shelter to Update</Form.Label>
            <Form.Control as="select" onChange={handleSelectShelter}>
              <option value="">Select Shelter</option>
              {shelters.map((shelter) => (
                <option key={shelter.id} value={shelter.id}>
                  {shelter.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

        <Button
          variant="primary"
          onClick={resetForm}
          className="mb-3"
          disabled={isAddingNew}
        >
          Add New Shelter
        </Button>

        {(selectedShelter || isAddingNew) && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="textarea"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Max Capacity</Form.Label>
              <Form.Control
                type="number"
                name="max_capacity"
                value={formData.max_capacity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Members in Shelter</Form.Label>
              <Form.Control
                type="number"
                name="members_in_shelter"
                value={formData.members_in_shelter}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Space Remaining</Form.Label>
              <Form.Control
                type="number"
                name="space_remaining"
                value={formData.space_remaining}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Full?"
                name="isFull"
                checked={formData.isFull}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Medical Facilities</Form.Label>
              <Form.Control
                as="select"
                multiple
                name="medical_facilities"
                value={formData.medical_facilities}
                onChange={(e) => handleMultiSelectChange(e, 'medical_facilities')}
              >
                {medicalFacilities.map((mf) => (
                  <option key={mf.id} value={mf.id}>
                    {mf.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Resources</Form.Label>
              <Form.Control
                as="select"
                multiple
                name="resources"
                value={formData.resources}
                onChange={(e) => handleMultiSelectChange(e, 'resources')}
              >
                {resources.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="success">
              {isAddingNew ? 'Add Shelter' : 'Update Shelter'}
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
}

export default UpdateShelter;