import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Container, Paper, Grid, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '../utils/userService';
import LogoutButton from '../components/LogoutButton';
import PhotoSection from '../components/PhotoSection';
import ProfileDetails from '../components/ProfileDetails';
import Login from '../components/Login';

function UserProfile() {
  const { currentUser, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const profileData = await getUserProfile(currentUser.uid);
      setUser(profileData || {
        name: 'Dwayne Johnson',
        email: 'The.Rock@hollywood.com',
        gender: 'Male',
        age: 50,
        weight: 200,
        height: 72,
        goals: 'To maintain a muscular physique fit for Hollywood movies.',
      });
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load profile');
      setIsLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    console.log('Saving changes...');
    try {
      await updateUserProfile(currentUser.uid, user);
      console.log('Changes saved successfully');
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError('Failed to update profile. Please try again.');
    }
    setIsLoading(false);
  };

  if (!currentUser) return <Login />;
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Box p={3} sx={{ maxWidth: 800, mx: 'auto' }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <ProfileDetails user={user} isEditing={isEditing} handleChange={handleChange} />
            <PhotoSection imagePath={user?.profilePic || 'default_avatar.jpg'} handleImageUpload={(e) => handleChange(e, 'profilePic')} label="Profile" isEditing={isEditing} />
            <PhotoSection imagePath={user?.beforePic || 'default_before.jpg'} handleImageUpload={(e) => handleChange(e, 'beforePic')} label="Before" isEditing={isEditing} />
            <PhotoSection imagePath={user?.afterPic || 'default_after.jpg'} handleImageUpload={(e) => handleChange(e, 'afterPic')} label="After" isEditing={isEditing} />
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" onClick={isEditing ? handleSave : handleEdit} sx={{ ml: 2 }}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
              {isEditing && <Button variant="outlined" onClick={handleCancel} sx={{ ml: 1 }}>Cancel</Button>}
              <LogoutButton handleLogout={logout} />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default UserProfile;
