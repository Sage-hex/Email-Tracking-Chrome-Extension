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
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  LinearProgress,
} from '@mui/material';

const Login = ({ onLoginSuccess, switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(''); // Track error messages
  const [successMessage, setSuccessMessage] = useState(''); // Track success messages

  // Handle form submission
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      setSuccessMessage(''); // Clear any previous success message
      return;
    }

    setLoading(true); // Show loading state
    setError(''); // Clear any previous errors
    setSuccessMessage(''); // Clear any previous success message

    try {
      const response = await axios.post(
        'https://emailtracking-server.onrender.com/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      onLoginSuccess(token); // Notify parent component of successful login
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        setSuccessMessage(''); // Clear the success message after a delay
      }, 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Display success message */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Display error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      {/* Loading indicator */}
      {loading && <LinearProgress />}

      <Box display="flex" flexDirection="column" gap={2}>
        {/* Email input field */}
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          autoFocus
          helperText={email ? '' : 'Enter your email address'}
          error={!email && !!error}
        />

        {/* Password input field */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          helperText={password ? '' : 'Enter your password'}
          error={!password && !!error}
        />

        {/* Login button */}
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? 'Logging In...' : 'Login'}
        </Button>

        {/* Switch to Signup */}
        <Button variant="text" onClick={switchToSignup}>
          Don't have an account? Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default Login;