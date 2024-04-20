import React from 'react';
import { Button } from '@mui/material';

function LogoutButton({ handleLogout }) {
  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
