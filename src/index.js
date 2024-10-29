import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { InfoProvider } from './components/context/InfoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <InfoProvider>
      <App />
    </InfoProvider>
  </BrowserRouter>
);