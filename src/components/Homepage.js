// src/components/Homepage.js
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Homepage.css';

function Homepage() {
  return (
    <div className='homepage'>
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>Disaster Shelter Management</h1>
          <p>Find shelters, report missing persons, or volunteer to help.</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button as={Link} to="/shelters" variant="primary" className="mx-2">Find Shelter</Button>
          <Button as={Link} to="/report-missing" variant="secondary" className="mx-2">Report Missing Person</Button>
          <Button as={Link} to="/volunteer/login" variant="info" className="mx-2">Volunteer Login</Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Homepage;