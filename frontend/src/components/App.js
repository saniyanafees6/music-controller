import React, { Component } from 'react';
import { render } from 'react-dom';
import { HomePage, RoomCreatePage, RoomJoinPage } from './';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/create-room" element={<RoomCreatePage />}></Route>
          <Route path="/join-room" element={<RoomJoinPage />}></Route>
        </Routes>
      </Router>
    );
  }
}
render(<App />, document.getElementById('app'));
