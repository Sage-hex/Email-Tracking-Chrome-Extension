// // src/components/Login.jsx

// import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { Container, Typography, Box } from '@mui/material';
// import axios from 'axios';

// const Login = ({ onLoginSuccess }) => {
//   const handleLoginSuccess = async (credentialResponse) => {
//     console.log('Google Credential Response:', credentialResponse);
//     const googleToken = credentialResponse.credential;
//     try {
//       // Send the Google token to your backend for verification
//       const response = await axios.post('https://email-tracking-server.onrender.com/auth/google', { token: googleToken });
//       const ourToken = response.data.token;
//       // Save the token in localStorage for later use
//       localStorage.setItem('jwtToken', ourToken);
//       onLoginSuccess(ourToken);
//       // Redirect to the dashboard after successful login
//       window.location.href = '/dashboard';
//     } catch (error) {
//       console.error('Error during Google authentication:', error);
//     }
//   };

//   const handleLoginError = () => {
//     console.error('Google Login Failed');
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Login with Google
//       </Typography>
//       <Box display="flex" justifyContent="center">
//         <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
//       </Box>
//     </Container>
//   );
// };

// export default Login;


// src/components/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Login = ({ onLoginSuccess, switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://email-tracking-server.onrender.com/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      onLoginSuccess(token);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="text" onClick={switchToSignup}>
          Don't have an account? Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
