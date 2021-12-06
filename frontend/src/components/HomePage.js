import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  ButtonGroup,
  Typography,
  Modal,
  Box,
} from '@material-ui/core';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { RoomSetting } from './';

const HomePage = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/v1/user-in-room`);
      setRoomCode(data.code);
    };
    getData();
  }, [roomCode]);
  //modal open/close handling
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      {roomCode && <Navigate to={`/room/${roomCode}`} replace={true} />}
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" component="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join Room
            </Button>
            <Button onClick={handleOpen}>Create Room</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Button onClick={handleClose} align="right">
                  X
                </Button>
                <RoomSetting _name="Create" />
              </Box>
            </Modal>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
