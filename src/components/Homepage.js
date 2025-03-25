import { Link } from 'react-router-dom';
import '../styles/Homepage.css';

function Homepage() {
  return (
    <div className="homepage-hero">
      <h1>Shelter Management Made Simple</h1>
      <p>Find shelters, report missing persons, or volunteer to help.</p>
      <div className="homepage-buttons">
        <Link to="/shelters" className="btn" aria-label="Find Shelter">
          <i className="fas fa-map-marker-alt"></i> Find Shelter
        </Link>
        <Link to="/report-missing" className="btn" aria-label="Report Missing">
          <i className="fas fa-user-plus"></i> Report Missing
        </Link>
        <Link to="/volunteer/login" className="btn" aria-label="Volunteer Now">
          <i className="fas fa-hands-helping"></i> Volunteer Now
        </Link>
      </div>
      <div className="wave"></div>
    </div>
  );
}

export default Homepage;