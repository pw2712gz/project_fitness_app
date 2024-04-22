import React from 'react';
import { NavLink } from 'react-router-dom';
import { Stack } from '@mui/material';
import Logo from '../assets/images/Logo.png';
import ProfileIcon from '../assets/images/profile-icon.webp';

const Navbar = () => {
  const activeStyle = {
    textDecoration: 'none',
    color: '#3A1212',
    borderBottom: '3px solid #FF2625',
  };

  const defaultStyle = {
    textDecoration: 'none',
    color: '#3A1212',
  };

  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ px: '20px', mt: { sm: '32px', xs: '20px', backgroundColor: '#FFE5E5' } }}>
      <NavLink to="/" exact>
        <img src={Logo} alt="logo" style={{ width: '48px', height: '48px', margin: '0 20px 0 0' }} />
      </NavLink>
      <Stack direction="row" gap="20px" fontFamily="Alegreya" fontSize="24px" alignItems="flex-end" flexGrow={1}>
        <NavLink to="/" exact style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}>Home</NavLink>
        <NavLink to="/ai-coach" style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}>AI Coach</NavLink>
        <NavLink to="/calendar" style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}>Calendar</NavLink>
        <NavLink to="/BmiCalculator" style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}>BMI Calculator</NavLink>
      </Stack>
      <NavLink to="UserProfile" style={{ marginLeft: 'auto' }}>
        <img src={ProfileIcon} alt="User Profile" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
      </NavLink>
    </Stack>
  );
};

export default Navbar;
