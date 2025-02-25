// // src/components/Signup.jsx

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';

// const Signup = ({ switchToLogin }) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     try {
//       await axios.post('http://localhost:3001/auth/signup', { username, email, password });
//       alert('Signup successful! Please log in.');
//       switchToLogin();
//     } catch (error) {
//       console.error('Signup error:', error);
//       alert('Signup failed: ' + (error.response?.data?.error || ''));
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Sign Up
//       </Typography>
//       <Box display="flex" flexDirection="column" gap={2}>
//         <TextField
//           label="Username"
//           variant="outlined"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextField
//           label="Email"
//           variant="outlined"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button variant="contained" onClick={handleSignup}>
//           Sign Up
//         </Button>
//         <Button variant="text" onClick={switchToLogin}>
//           Already have an account? Login
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Signup;


// src/components/Signup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Signup = ({ switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post(
        'https://email-tracking-server.onrender.com/auth/signup',
        { username, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert('Signup successful! Please log in.');
      switchToLogin();
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert('Signup failed: ' + (error.response?.data?.error || ''));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Button variant="contained" onClick={handleSignup}>
          Sign Up
        </Button>
        <Button variant="text" onClick={switchToLogin}>
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
