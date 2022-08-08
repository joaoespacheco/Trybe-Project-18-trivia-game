import React, { Component } from 'react';
import Header from '../components/Header';

export default class Game extends Component {
  state = {
    assertions: 0,
    score: 0,
  }

  render() {
    return (
      <main>
        <Header { ...this.state } />
        <div>Game</div>
      </main>
    );
  }
}
