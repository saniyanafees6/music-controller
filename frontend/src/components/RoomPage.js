import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, Modal, Box } from '@material-ui/core';
import { RoomSetting } from './';

const RoomPage = () => {
  const [fetchData, setFetchData] = useState([]);
  let { roomCode } = useParams();
  let navigate = useNavigate();

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

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios
        .get(`/api/v1/get-room?code=${roomCode}`)
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('error message: ', error.response);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log('error request: ', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error: ', error.message);
          }
          console.log('error config: ', error.config);
          navigate('/');
        });
      setFetchData(data);
    };
    getData();
  }, [roomCode]);

  const handleLeave = () => {
    axios.post('/api/v1/leave-room').then((res) => {
      navigate('/');
    });
  };

  return (
    <Grid container spacing={1}>
      {fetchData ? (
        <>
          {fetchData.is_host && (
            <>
              <Button onClick={handleOpen}>Change Settings</Button>
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
                  <RoomSetting
                    _name="Setting"
                    _guestCanPause={fetchData.guest_can_pause}
                    _votesToSkip={fetchData.votes_to_skip}
                    _roomCode={fetchData.code}
                  />
                </Box>
              </Modal>
            </>
          )}
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Code: {fetchData.code}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h4">
              guest can pause: {fetchData.guest_can_pause ? 'true' : 'false'}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h4">
              votes to skip: {fetchData.votes_to_skip}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" onClick={handleLeave}>
              Leave Room
            </Button>
          </Grid>
        </>
      ) : (
        <p>No Room Found</p>
      )}
    </Grid>
  );
};

export default RoomPage;
