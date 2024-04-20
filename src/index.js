import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
// TODO: ChatGPT history + Text similar to the on in this vid https://www.youtube.com/watch?v=emW0E8E6M0c
// TODO: Test Logout
// TODO: Test each pages login component
// TODO: Fix profile component
// TODO: 