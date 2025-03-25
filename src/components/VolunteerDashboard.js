import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/VolunteerDashboard.css';

function VolunteerDashboard() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/volunteer/login');
  };

  return (
    <div className="volunteer-dashboard">
      <h2>Welcome, Volunteer</h2>
      <div className="dashboard-grid">
        <div className="card">
          <i className="fas fa-user-plus"></i>
          <h3>Register Victim</h3>
          <Link to="/volunteer/register-victim" className="btn">Go</Link>
        </div>
        <div className="card">
          <i className="fas fa-home"></i>
          <h3>Update Shelter</h3>
          <Link to="/volunteer/update-shelter" className="btn">Go</Link>
        </div>
        <div className="card">
          <i className="fas fa-sign-out-alt"></i>
          <h3>Logout</h3>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default VolunteerDashboard;