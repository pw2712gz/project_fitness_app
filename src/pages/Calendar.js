import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { v4 as uuidv4 } from 'uuid';
import AddExerciseModal from '../components/AddExerciseModal';
import EditExerciseModal from '../components/EditExerciseModal';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';

const Calendar = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
  const [editExerciseModalOpen, setEditExerciseModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const generateUniqueId = () => uuidv4();

  const handleAddExercise = (title, duration) => {
    const newExercise = {
      id: generateUniqueId(),
      title,
      start: selectedDate,
      extendedProps: {
        duration,
      },
    };
    setEvents([...events, newExercise]);
    setAddExerciseModalOpen(false);
  };

  const handleEditExercise = (id, title, duration) => {
    const updatedEvents = events.filter((exercise) => exercise.id !== id);
    const updatedExercise = {
      id, // Keep the same ID
      title,
      start: selectedDate,
      extendedProps: {
        duration,
      },
    };
    setEvents([...updatedEvents, updatedExercise]);
    setEditExerciseModalOpen(false);
    setSelectedExercise(null);
  };

  const handleDeleteExercise = (id) => {
    const updatedEvents = events.filter((exercise) => exercise.id !== id);
    setEvents(updatedEvents);
    if (selectedExercise && selectedExercise.id === id) {
      setSelectedExercise(null);
      setEditExerciseModalOpen(false); // Close the edit modal if open
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedExercise(clickInfo.event);
    setEditExerciseModalOpen(true);
  };

  const handleDateSelect = (selectionInfo) => {
    setSelectedDate(selectionInfo.startStr);
    setAddExerciseModalOpen(true);
  };

  const eventContent = (arg) => (
    <div>{arg.event.title} - {arg.event.extendedProps.duration}min</div>
  );

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div>
      <h1>Calendar Page</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        }}
        initialView="dayGridMonth"
        editable
        selectable
        selectMirror
        dayMaxEvents
        select={handleDateSelect}
        eventClick={handleEventClick}
        events={events}
        eventContent={eventContent}
      />
      <AddExerciseModal
        isOpen={addExerciseModalOpen}
        onClose={() => setAddExerciseModalOpen(false)}
        onAddExercise={handleAddExercise}
        selectedDate={selectedDate}
      />
      <EditExerciseModal
        isOpen={editExerciseModalOpen}
        onClose={() => setEditExerciseModalOpen(false)}
        onEditExercise={handleEditExercise}
        onDeleteExercise={handleDeleteExercise}
        selectedExercise={selectedExercise}
      />
    </div>
  );
};

export default Calendar;
