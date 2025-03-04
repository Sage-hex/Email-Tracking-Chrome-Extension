// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import CssBaseline from '@mui/material/CssBaseline';

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// console.log("Google Client ID:", clientId);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <GoogleOAuthProvider clientId={clientId}>
//       <CssBaseline />
//       <App />
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
