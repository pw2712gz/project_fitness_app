import React, { useState } from 'react';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddExerciseModal = ({ isOpen, onClose, onAddExercise}) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(1);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please fill in the exercise title');
      return;
    }

    onAddExercise(title, duration);
    onClose();
    setTitle('');
    setDuration(1);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', border: '2px solid #000', boxShadow: 24, padding: '16px', maxWidth: '400px' }}>
        <h2>Add Exercise</h2>
        <FormControl fullWidth margin="dense">
          <TextField
            label="Exercise Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="duration-label">Duration (minutes)</InputLabel>
          <Select
            labelId="duration-label"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            {[...Array(10)].map((_, index) => (
              <MenuItem key={index} value={index + 1}>{index + 1}</MenuItem>
            ))}
            {[15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((value) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>Add Exercise</Button>
      </div>
    </Modal>
  );
};

export default AddExerciseModal;
