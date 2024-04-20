import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Paper, Stack, Typography, CircularProgress, List, ListItem } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';

const AICoachPage = () => {
  const { currentUser } = useAuth();
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollableMessagesRef = useRef(null);

  useEffect(() => {
    if (scrollableMessagesRef.current) {
      scrollableMessagesRef.current.scrollTop = scrollableMessagesRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const formatMessage = (message) => message.split(':').map((part, index) => (
    <ListItem key={index}>{part.trim()}</ListItem>
  ));

  const fetchResponse = async (input) => {
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
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: input },
          ],
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return data.choices[0].message.content;
      }
      throw new Error(data.error?.message || 'Failed to fetch AI response.');
    } catch (error) {
      console.error('API call error:', error.message);
      return "Sorry, I couldn't process that.";
    }
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setConversation((prev) => [...prev, { sender: 'user', text: userInput }]);
    setIsTyping(true);

    const aiResponse = await fetchResponse(userInput);
    setConversation((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    setIsTyping(false);
    setUserInput('');
  };

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(95vh - 55px - 20px)', mx: 'auto', my: 2, width: '100%', maxWidth: '500px' }}>
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', overflow: 'hidden' }}>
        <Box ref={scrollableMessagesRef} sx={{ overflowY: 'auto', p: 2, flexGrow: 1 }}>
          {conversation.map((message, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start', mb: 1 }}>
              {message.sender === 'ai' ? (
                <List sx={{ wordBreak: 'break-word', fontFamily: 'Josefin Sans', background: '#fce4ec', borderRadius: '10px', p: '6px', maxWidth: '75%' }}>
                  {formatMessage(message.text)}
                </List>
              ) : (
                <Typography sx={{ wordBreak: 'break-word', fontFamily: 'Josefin Sans', background: '#BBDEFB', borderRadius: '10px', p: '6px', maxWidth: '75%' }}>
                  {message.text}
                </Typography>
              )}
            </Box>
          ))}
          {isTyping && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
              <Typography sx={{ display: 'flex', alignItems: 'center', wordBreak: 'break-word', fontFamily: 'Josefin Sans', background: '#fce4ec', borderRadius: '10px', p: '6px', maxWidth: '75%' }}>
                <CircularProgress size={20} thickness={5} /> Coach is typing...
              </Typography>
            </Box>
          )}
        </Box>
        <Stack direction="row" spacing={1} sx={{ p: 1, bgcolor: 'background.paper', borderTop: '1px solid rgba(0,0,0,.12)' }}>
          <TextField fullWidth label="Ask your AI Coach" value={userInput} onChange={handleInputChange} variant="outlined" onKeyDown={(event) => event.key === 'Enter' && handleSubmit()} size="small" placeholder="Type your question here..." />
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#FF2625', '&:hover': { bgcolor: '#FF2625' } }}>
            Send
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AICoachPage;
