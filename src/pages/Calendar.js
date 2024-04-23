import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import AddExerciseModal from '../components/AddExerciseModal';
import EditExerciseModal from '../components/EditExerciseModal';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import { db } from '../firebase/config';

const Calendar = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
  const [editExerciseModalOpen, setEditExerciseModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(collection(db, 'users', currentUser.uid, 'exercises'), (snapshot) => {
        const loadedEvents = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEvents(loadedEvents);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleAddExercise = async (title, duration) => {
    const newExercise = {
      id: uuidv4(),
      title,
      start: selectedDate,
      extendedProps: {
        duration,
      },
    };
    setEvents([...events, newExercise]);
    setAddExerciseModalOpen(false);
    await setDoc(doc(db, 'users', currentUser.uid, 'exercises', newExercise.id), newExercise);
  };

  const handleEditExercise = async (id, title, duration) => {
    const updatedExercise = {
      id,
      title,
      start: selectedDate,
      extendedProps: {
        duration,
      },
    };
    const newEvents = events.map((event) => (event.id === id ? updatedExercise : event));
    setEvents(newEvents);
    setEditExerciseModalOpen(false);
    setSelectedExercise(null);
    await setDoc(doc(db, 'users', currentUser.uid, 'exercises', id), updatedExercise);
  };

  const handleDeleteExercise = async (id) => {
    setEvents(events.filter((event) => event.id !== id));
    if (selectedExercise && selectedExercise.id === id) {
      setSelectedExercise(null);
      setEditExerciseModalOpen(false);
    }
    await deleteDoc(doc(db, 'users', currentUser.uid, 'exercises', id));
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
