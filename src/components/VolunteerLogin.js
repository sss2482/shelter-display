import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/VolunteerLogin.css';

function VolunteerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/token/', { username, password });
      setToken(response.data.access);
      localStorage.setItem('token', response.data.access);
      navigate('/volunteer/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="volunteer-login">
      <div className="card">
        <div className="card-body">
          <h2>Volunteer Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-label="Username"
              />
            </label>
            <label className="mt-3">
              Password:
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
            </label>
            <button type="submit" className="btn mt-3" aria-label="Login">
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VolunteerLogin;