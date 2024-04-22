import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Calendar from './pages/Calendar';
import UserProfile from './pages/UserProfile';
import AICoachPage from './pages/AICoachPage';
import BmiCalculator from './pages/BmiCalculator';
import { AuthProvider } from './contexts/AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => (
  <Router>
    <AuthProvider> {}
      <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/ai-coach" element={<AICoachPage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/BmiCalculator" element={<BmiCalculator />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
        <Footer />
      </Box>
    </AuthProvider>
  </Router>
);

export default App;
