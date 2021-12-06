import React, { useState } from 'react';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState('');
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const handleSubmit = () => {
    const roomOptions = {
      code: roomCode,
    };
    axios
      .post('/api/v1/join-room', roomOptions)
      .then((res) => {
        navigate(`/room/${roomCode}`);
      })
      .catch(function (error) {
        if (error.response) {
          console.log('error message: ', error.response);
        } else if (error.request) {
          console.log('error request: ', error.request);
        } else {
          console.log('Error: ', error.message);
        }
        console.log('error conifg: ', error.config);
        setError('Room not found');
      });
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={(e) => setRoomCode(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;
