import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/ShelterLocator.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function ShelterLocator() {
  const [shelters, setShelters] = useState([]);
  const [bestShelter, setBestShelter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [medicalFacilities, setMedicalFacilities] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedMedical, setSelectedMedical] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheltersResponse = await axios.get('http://localhost:8000/data/shelters/');
        setShelters(sheltersResponse.data);
        const medicalResponse = await axios.get('http://localhost:8000/data/medical-facilities/');
        setMedicalFacilities(medicalResponse.data);
        const resourcesResponse = await axios.get('http://localhost:8000/data/resources/');
        setResources(resourcesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location.');
        }
      );
    }
  }, []);

  // Handle filter changes
  const handleMedicalChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedMedical(options);
  };

  const handleResourceChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedResources(options);
  };

  // Find best shelter
  const findBestShelter = async () => {
    if (!userLocation) {
      alert('Location not available.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/data/best_shelter/', {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        medical_facilities: selectedMedical,
        resources: selectedResources,
      });
      setBestShelter(response.data);
    } catch (error) {
      console.error('Error finding best shelter:', error);
      alert('Failed to find the best shelter.');
    } finally {
      setLoading(false);
    }
  };

  // Filter shelters by search
  const filteredShelters = shelters.filter((shelter) =>
    shelter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shelter-locator">
      <header className="header">
        <h1>Shelter Locator</h1>
        <p>Find nearby shelters and locate the best one based on your needs.</p>
      </header>

      <div className="sidebar">
        <h3>Search & Filters</h3>
        <input
          type="text"
          className="search-bar"
          placeholder="Search shelters by name or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="filters">
          <label>
            Medical Facilities:
            <select multiple value={selectedMedical} onChange={handleMedicalChange}>
              {medicalFacilities.map((mf) => (
                <option key={mf.id} value={mf.name}>
                  {mf.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Resources:
            <select multiple value={selectedResources} onChange={handleResourceChange}>
              {resources.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="find-best-btn" onClick={findBestShelter} disabled={loading}>
          {loading ? 'Finding...' : 'Find Best Shelter'}
        </button>
      </div>

      <MapContainer center={[51.505, -0.09]} zoom={13} className="map-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredShelters.map((shelter) => (
          <Marker key={shelter.id} position={[shelter.latitude, shelter.longitude]}>
            <Popup>{shelter.name}</Popup>
          </Marker>
        ))}
        {bestShelter && (
          <Marker position={[bestShelter.latitude, bestShelter.longitude]}>
            <Popup>
              <strong>Best Shelter: {bestShelter.name}</strong>
              <br />
              Distance: {bestShelter.distance} km
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {bestShelter && (
        <div className="best-shelter-details">
          <h3>Best Shelter Found</h3>
          <p><strong>Name:</strong> {bestShelter.name}</p>
          <p><strong>Location:</strong> {bestShelter.location}</p>
          <p><strong>Distance:</strong> {bestShelter.distance} km</p>
        </div>
      )}
    </div>
  );
}

export default ShelterLocator;