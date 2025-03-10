import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/global.scss';
import './mock';
import '@/request';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
