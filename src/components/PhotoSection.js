import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

function PhotoSection({ imagePath, handleImageUpload, label, isEditing }) {
  // Apply circular style if the label is 'Profile'
  const imageStyle = label === 'Profile' ? {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
  } : {
    width: '300px',
    height: '300px',
  };

  return (
    <Grid item xs={12} sm={6}>
      <img src={imagePath} alt={`${label} Picture`} style={imageStyle} />
      {isEditing && (
        <Button component="label">
          Change {label} Photo
          <input type="file" hidden onChange={handleImageUpload} />
        </Button>
      )}
    </Grid>
  );
}

export default PhotoSection;

