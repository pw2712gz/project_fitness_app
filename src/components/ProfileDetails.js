import React from 'react';
import { Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';

function ProfileDetails({ user, isEditing, handleChange }) {
  return (
    <Grid item xs={12} sm={6}>
      {isEditing ? (
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup row name="gender" value={user.gender} onChange={handleChange}>
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
      ) : (
        <Typography>Gender: {user.gender}</Typography>
      )}
      <Typography>Age: {user.age} years old</Typography>
      <Typography>Weight: {user.weight} lbs</Typography>
      <Typography>Height: {user.height} in</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>BMI: {((user.weight / (user.height * user.height)) * 703).toFixed(2)}</Typography>
      <Typography>Fitness Goals: {user.goals}</Typography>
    </Grid>
  );
}

export default ProfileDetails;
