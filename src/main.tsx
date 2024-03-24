import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './utils/i18n.ts';
import './index.css';
import 'flag-icons/css/flag-icons.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
