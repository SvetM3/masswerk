import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { useARG } from "./lib/ARGContext";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ARGProvider>
      <App />
    </ARGProvider>
  </React.StrictMode>
);
