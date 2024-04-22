import React, { useRef, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Divider, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, auth, signUp } = useAuth(); // Assuming `signUp` and `auth` are exported from useAuth
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/'); // Redirect to home or dashboard after successful login
    } catch {
      setError('Failed to log in');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError('');
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setError('Failed to sign in with Google');
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 8, p: 3, border: '1px solid #ccc', borderRadius: '4px' }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Login</Typography>
      <form onSubmit={handleSubmit}>
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
          {loading ? <CircularProgress size={24} /> : 'Log In'}
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </form>
      <Divider sx={{ my: 2 }}>OR</Divider>
      <Button onClick={handleSignUp} fullWidth variant="contained" color="secondary">
        Sign Up
      </Button>
    </Box>
  );
}

export default Login;
