import React, { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { BMIOptions, fetchData } from '../utils/fetchData';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';

const BmiCalculator = () => {
  const { currentUser } = useAuth();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [BMI, setBMI] = useState(null);
  const [health, setHealth] = useState('');
  const [healthyBmiRange, setHealthyBmiRange] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBMICalData = async () => {
    if (!weight || !height || !age || weight < 40 || weight > 160 || height < 130 || height > 230 || age < 0 || age > 80) {
      setError('Please enter valid values within the specified ranges.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const BMIData = await fetchData(`https://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`, BMIOptions);
      if (BMIData.status_code === 200) {
        setBMI(BMIData.data.bmi);
        setHealth(BMIData.data.health);
        setHealthyBmiRange(BMIData.data.healthy_bmi_range);
      } else {
        setError('Failed to fetch data from API.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data.');
    }

    setLoading(false);
  };

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>BMI Calculator</Typography>
      <Stack spacing={3}>
        <TextField
          type="number"
          label="Weight in Kg (40kg to 160kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          type="number"
          label="Height in CM (130cm to 230cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          type="number"
          label="Age (0 to 80 years)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          onClick={fetchBMICalData}
          disabled={loading}
          color="primary"
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Calculate BMI'}
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {BMI && (
        <Stack spacing={2} mt={2}>
          <Typography variant="h6">BMI Results:</Typography>
          <Typography>BMI: <strong style={{ color: '#4CAF50' }}>{BMI}</strong></Typography>
          <Typography>Health: <strong style={{ color: '#4CAF50' }}>{health}</strong></Typography>
          <Typography>Healthy BMI Range: <strong
            style={{ color: '#4CAF50' }}
          >{healthyBmiRange}
          </strong>
          </Typography>
        </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default BmiCalculator;
