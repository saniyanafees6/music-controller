import {
  Typography,
  Grid,
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Radio,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomSetting = ({
  _name,
  _guestCanPause = true,
  _votesToSkip = 2,
  _roomCode,
}) => {
  const [guestCanPause, setGuestCanPause] = useState(_guestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(_votesToSkip);
  let navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload();
  };
  const handleSubmit = () => {
    const roomCreateOptions = {
      guest_can_pause: guestCanPause,
      votes_to_skip: votesToSkip,
    };
    const roomUpdateOptions = {
      guest_can_pause: guestCanPause,
      votes_to_skip: votesToSkip,
      code: _roomCode,
    };
    _name === 'Setting'
      ? axios.patch('/api/v1/update-room', roomUpdateOptions).then((res) => {
          refreshPage();
        })
      : axios.post('/api/v1/create-room', roomCreateOptions).then((res) => {
          navigate(`/room/${res.data.code}`);
        });
  };
  return (
    <>
      <Typography variant="h4" component="h4">
        {_name}
      </Typography>

      <Grid item xs={12} align="center">
        <FormControl control="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={
              _name === 'Setting' ? (_guestCanPause ? 'true' : 'false') : 'true'
            }
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
              onChange={(e) => setGuestCanPause(true)}
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
              onChange={(e) => setGuestCanPause(false)}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            require={true}
            type="number"
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: 'center' },
            }}
            onChange={(e) => setVotesToSkip(e.target.value)}
          />
          <FormHelperText>
            <div align="center">Votes Required to Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          {_name === 'Setting' ? 'Update Room Setting' : 'Create Room'}
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </>
  );
};

export default RoomSetting;
