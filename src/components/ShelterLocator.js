// src/components/ShelterLocator.js
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
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/data/shelters/')
      .then(response => setShelters(response.data))
      .catch(error => console.error('Error fetching shelters:', error));
  }, []);

  const filteredShelters = showOnlyAvailable
    ? shelters.filter(s => s.space_remaining > 0 || s.isFull === false)
    : shelters;

  return (
    <div className="shelter-locator container mt-4">
      <h2>Shelter Locator</h2>
      <div className="filter-checkbox"> 
        <label>
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={() => setShowOnlyAvailable(!showOnlyAvailable)}
          />
          Show only shelters with available space
        </label>
      </div>
      <MapContainer className='map-container' center={[26.44, 73.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredShelters.map(shelter => (
          <Marker key={shelter.id} position={[shelter.latitude, shelter.longitude]}>
            <Popup>
              <h3>{shelter.name}</h3>
              <p>Capacity: {shelter.max_capacity}</p>
              <p>Available Space: {shelter.space_remaining}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default ShelterLocator;