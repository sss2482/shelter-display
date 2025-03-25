// src/components/VolunteerDashboard.js
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/VolunteerDashboard.css';
function VolunteerDashboard() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/volunteer/login');
  };

  return (
    <div className="volunteer-dashboard">
      <h2>Volunteer Dashboard</h2>
      <div className="dashboard-links">
        <Link to="/volunteer/register-victim" className="mb-2">Register Victim</Link>
        <Link to="/volunteer/update-shelter" className="mb-2">Update Shelter</Link>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

export default VolunteerDashboard;