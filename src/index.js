// import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import './assets/styles/global.sass';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // FIXME: popup timer launches twice and doesnt stop (cause: strict mode)
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
