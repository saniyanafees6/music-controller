import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RoomCreatePage = () => {
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(2);
  const handleSubmit = () => {
    const roomOptions = {
      guest_can_pause: guestCanPause,
      votes_to_skip: votesToSkip,
    };
    console.log(roomOptions);
    axios.post('/api/v1/create-room', roomOptions).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  const buttonCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl control="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup row defaultValue="true">
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
      <Grid item xs={12} align="center" style={buttonCenter}>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Create a Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center" style={buttonCenter}>
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};
export default RoomCreatePage;
