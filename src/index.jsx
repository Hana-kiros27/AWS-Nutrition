import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// --- Node.js polyfills for Vite + amazon-cognito-identity-js ---
import { Buffer } from 'buffer';
window.Buffer = Buffer;

import process from 'process';
window.process = process;

// ----------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
