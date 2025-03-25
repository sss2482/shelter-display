import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.css'
import App from './App';
import reportWebVitals from './reportWebVitals';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHandsHelping, 
  faMapMarkerAlt, 
  faUserPlus, 
  faHome, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faHandsHelping, faMapMarkerAlt, faUserPlus, faHome, faSignOutAlt);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
