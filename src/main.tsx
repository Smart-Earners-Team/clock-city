// src/main.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import Routes from './routes';
import './index.css'
import { ThemeProvider } from './components/Theme/ThemeContext';

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>
)