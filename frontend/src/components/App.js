import React, { Component } from 'react';
import { render } from 'react-dom';
import { HomePage, RoomJoinPage, RoomPage } from './';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/join" element={<RoomJoinPage />}></Route>
          <Route path="/room/:roomCode" element={<RoomPage />}></Route>
        </Routes>
      </Router>
    );
  }
}
render(<App />, document.getElementById('app'));
