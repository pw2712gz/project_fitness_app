import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField} from '@mui/material';

const EditExerciseModal = ({isOpen, onClose, onEditExercise, onDeleteExercise, selectedExercise}) => {
    console.log('EditExerciseModal props:', {isOpen, onClose, onEditExercise, onDeleteExercise, selectedExercise});

    const [title, setTitle] = useState(selectedExercise ? selectedExercise.title : ''); // Set default value to empty string
    const [duration, setDuration] = useState(selectedExercise ? selectedExercise.extendedProps.duration : 1); // Set default value to 1

    useEffect(() => {
        console.log('Selected exercise:', selectedExercise);
        console.log('Title:', title);
        console.log('Duration:', duration);
        if (selectedExercise) {
            setTitle(selectedExercise.title);
            setDuration(selectedExercise.extendedProps.duration);
        }
    }, [selectedExercise]);

    const handleSubmit = () => {
        if (!title.trim()) {
            alert('Please fill in the exercise title');
            return;
        }

        onEditExercise(selectedExercise.id, title, duration);
        onClose();
    };

    const handleDelete = () => {
        onDeleteExercise(selectedExercise.id);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#fff',
                border: '2px solid #000',
                boxShadow: 24,
                padding: '16px',
                maxWidth: '400px'
            }}>
                <h2>Edit Exercise</h2>
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
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>Update Exercise</Button>
                <Button variant="contained" color="secondary" onClick={handleDelete} fullWidth>Delete
                    Exercise</Button> {/* Delete button */}
            </div>
        </Modal>
    );
};

export default EditExerciseModal;
