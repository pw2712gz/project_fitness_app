import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import HeroBannerImage from '../assets/images/banner.png';

const HeroBanner = () => (
  <Box sx={{ mt: { lg: '12px', xs: '6px' }, ml: { sm: '50px' } }} position="relative" p="20px">
    <Typography color="#FF2625" fontWeight="600" fontSize="35px">Iron Alliance Dev Team</Typography>
    <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px' } }} mb="23px" mt="30px">
      Strength <br />
      is Our Passion
    </Typography>
    <Typography fontSize="22px" fontFamily="Alegreya" lineHeight="35px">
      Check out the most effective exercises personalized to you<br />
      Ask our custom AI Coach any questions you have
    </Typography>
    <Stack mb="50px">
      <a
        href="#exercises"
        style={{
          marginTop: '45px',
          textDecoration: 'none',
          width: '200px',
          textAlign: 'center',
          background: '#FF2625',
          padding: '14px',
          fontSize: '22px',
          textTransform: 'none',
          color: 'white',
          borderRadius: '4px',
        }}
      >Explore Exercises
      </a>
      <a
        href="/ai-coach"
        style={{
          marginTop: '45px',
          textDecoration: 'none',
          width: '200px',
          textAlign: 'center',
          background: '#FF2625',
          padding: '14px',
          fontSize: '22px',
          textTransform: 'none',
          color: 'white',
          borderRadius: '4px',
        }}
      >Meet Your AI Coach
      </a>
    </Stack>
    <Typography
      z-index="1"
      fontWeight={600}
      color="#FF2625"
      sx={{ opacity: '0.1', display: { lg: 'block', xs: 'none' }, fontSize: '200px' }}
    >
      Iron<p /> Alliance
    </Typography>
    <img style={{ marginTop: '1px' }} src={HeroBannerImage} alt="hero-banner" className="hero-banner-img" />
  </Box>
);

export default HeroBanner;
