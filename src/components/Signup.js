import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Box, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import to navigate after successful signup
import { auth } from '../firebase/config';
import { createUserProfile } from '../utils/userService';

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef(); // New reference for the name input
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading during the signup process
  const navigate = useNavigate(); // Hook to navigate

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      await createUserProfile(userCredential.user.uid, {
        name: nameRef.current.value, // Now using the name input
        email: emailRef.current.value, // Also storing the email
      });
      setLoading(false);
      navigate('/'); // Redirect to home page or dashboard after successful signup
    } catch (error) {
      setError(`Error signing up: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Sign Up</Typography>
      <form onSubmit={handleSignup}>
        <TextField
          label="Name"
          type="text"
          inputRef={nameRef}
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          inputRef={emailRef}
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          inputRef={passwordRef}
          required
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </form>
    </Paper>
  );
}

export default Signup;
