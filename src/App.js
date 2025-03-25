// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Homepage from './components/Homepage';
import ShelterLocator from './components/ShelterLocator';
import MissingPersonForm from './components/MissingPersonForm';
import VolunteerLogin from './components/VolunteerLogin';
import VolunteerDashboard from './components/VolunteerDashboard';
import RegisterVictim from './components/RegisterVictim';
import UpdateShelter from './components/UpdateShelter';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/shelters" element={<ShelterLocator />} />
          <Route path="/report-missing" element={<MissingPersonForm />} />
          <Route path="/volunteer/login" element={<VolunteerLogin />} />
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer/register-victim" element={<RegisterVictim />} />
          <Route path="/volunteer/update-shelter" element={<UpdateShelter />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
} 

export default App;