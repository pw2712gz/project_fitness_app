import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, CircularProgress, List, ListItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import Login from '../components/Login';

const AICoachPage = () => {
  const { currentUser } = useAuth();
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollableMessagesRef = useRef(null);

  // Load conversation history when component mounts
  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, "conversations", currentUser.uid, "messages"), orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setConversation(messages);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  useEffect(() => {
    if (scrollableMessagesRef.current) {
      scrollableMessagesRef.current.scrollTop = scrollableMessagesRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const formatMessage = (message) => (
      <ListItem key={message.id}>{message.text}</ListItem>
  );

  const fetchResponse = async (input) => {
    setIsTyping(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are an AI exercise coach' },
            { role: 'user', content: input },
          ],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Save the AI's response to Firestore
        await addDoc(collection(db, "conversations", currentUser.uid, "messages"), {
          sender: 'ai',
          text: data.choices[0].message.content,
          timestamp: new Date()
        });
        setIsTyping(false);
        return data.choices[0].message.content;
      } else {
        throw new Error(data.error?.message || 'Failed to fetch AI response.');
      }
    } catch (error) {
      setIsTyping(false);
      return "Sorry, I couldn't process that.";
    }
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    const trimmedInput = userInput.trim();
    setUserInput('');

    // Save user's message to Firestore
    await addDoc(collection(db, "conversations", currentUser.uid, "messages"), {
      sender: 'user',
      text: trimmedInput,
      timestamp: new Date()
    });

    // Fetch and save AI's response
    await fetchResponse(trimmedInput);
  };

  if (!currentUser) {
    return <Login />;
  }

  return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(95vh - 55px - 20px)',
        mx: 'auto',
        my: 2,
        width: '100%',
        maxWidth: '500px',
      }}
      >
        <Paper elevation={3} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          overflow: 'hidden',
          p: 3
        }}>
          <Box ref={scrollableMessagesRef} sx={{ overflowY: 'auto', flexGrow: 1 }}>
            {conversation.map((message, index) => (
                <Box key={index} sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1,
                }}>
                  <List sx={{
                    wordBreak: 'break-word',
                    background: message.sender === 'ai' ? '#fce4ec' : '#BBDEFB',
                    borderRadius: '10px',
                    p: '6px',
                    maxWidth: '75%',
                  }}>
                    {formatMessage(message)}
                  </List>
                </Box>
            ))}
            {isTyping && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                  <Typography sx={{
                    display: 'flex',
                    alignItems: 'center',
                    wordBreak: 'break-word',
                    background: '#fce4ec',
                    borderRadius: '10px',
                    p: '6px',
                    maxWidth: '75%',
                  }}>
                    <CircularProgress size={20} thickness={5} /> Coach is typing...
                  </Typography>
                </Box>
            )}
          </Box>
          <Stack
              direction="row"
              spacing={1}
              sx={{ p: 2, bgcolor: 'background.paper', borderTop: '1px solid rgba(0,0,0,.12)' }}
          >
            <TextField
                fullWidth
                label="Ask your AI Coach"
                value={userInput}
                onChange={handleInputChange}
                variant="outlined"
                onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
                size="small"
                placeholder="Type your question here..."
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ bgcolor: '#FF2625', '&:hover': { bgcolor: '#FF2625' } }}
            >
              Send
            </Button>
          </Stack>
        </Paper>
      </Box>
  );
};

export default AICoachPage;
