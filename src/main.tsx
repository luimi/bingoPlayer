import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BingoProvider } from './contexts/BingoContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BingoProvider>
      <App />
    </BingoProvider>
  </React.StrictMode>
);