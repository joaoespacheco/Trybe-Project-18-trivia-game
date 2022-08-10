import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const localranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = localranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking: sortedRanking });
  }

  render() {
    const { ranking } = this.state;
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
        {
          ranking.map(({ name, score, picture }, index) => (
            <div key={ index }>
              <img src={ picture } alt={ `${name}` } />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </div>
          ))
        }
      </div>
    );
  }
}
