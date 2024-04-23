import React, { useState } from 'react';
import { Button, CircularProgress, Container, Stack, TextField, Typography, Alert, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
}));

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [age, setAge] = useState('');
  const [BMI, setBMI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getBMIInsight = (bmi) => {
    if (bmi < 18.5) {
      return 'You are underweight.';
    } if (bmi >= 18.5 && bmi <= 24.9) {
      return 'You are at a normal weight.';
    } if (bmi >= 25 && bmi <= 29.9) {
      return 'You are overweight.';
    }
    return 'You are obese.';
  };

  const calculateBMI = () => {
    let valid = true;
    setError('');
    const totalInches = parseInt(feet, 10) * 12 + parseInt(inches, 10);

    if (!weight || weight < 50 || weight > 1000) {
      setError('Please enter a valid weight in pounds (e.g., 150 lbs).');
      valid = false;
    }
    if (!feet || !inches || totalInches < 48 || totalInches > 96) {
      setError('Please enter a valid height in feet and inches (e.g., 5 feet 10 inches).');
      valid = false;
    }
    if (age < 10 || age > 120) {
      setError('Please enter a valid age (e.g., 35 years).');
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    try {
      const weightInPounds = parseFloat(weight);
      const bmiValue = (weightInPounds / (totalInches * totalInches)) * 703;
      setBMI(bmiValue.toFixed(2));
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError('Failed to calculate BMI. Please check your inputs.');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <StyledPaper>
        <Typography variant="h4" gutterBottom textAlign="center" color="primary">
          BMI Calculator (US Units)
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="Weight in pounds (lbs)"
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Feet (ft)"
              variant="outlined"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
              type="number"
              fullWidth
            />
            <TextField
              label="Inches (in)"
              variant="outlined"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              type="number"
              fullWidth
            />
          </Stack>
          <TextField
            label="Age (years)"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            fullWidth
          />
          <Button
            onClick={calculateBMI}
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Calculate BMI'}
          </Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {BMI && (
            <Typography sx={{ mt: 4, textAlign: 'center' }}>
              Your BMI is: <strong>{BMI}</strong><br />
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                {getBMIInsight(BMI)}
              </Typography>
            </Typography>
          )}
        </Stack>
      </StyledPaper>
    </Container>
  );
};

export default BMICalculator;
