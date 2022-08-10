import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <Link
          to="/"
          data-testid="btn-go-home"
        >
          Página Inicial
        </Link>
      </div>
    );
  }
}
