import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Main React App component
import './index.css'; // Global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Target the div with id="root" in public/index.html
);