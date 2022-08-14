import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/Ranking.module.css';

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
      <main className={ styles.main }>
        <div>
          <h1 data-testid="ranking-title">
            Ranking
          </h1>
          <ul>
            {
              ranking.map(({ name, score, picture }, index) => (
                <li key={ index }>
                  <p>{`${index + 1}°`}</p>
                  <img src={ picture } alt={ `${name}` } />
                  <div>
                    <p data-testid={ `player-name-${index}` }>
                      Jogador:
                      {' '}
                      {name}
                    </p>
                    <p data-testid={ `player-score-${index}` }>
                      Pontuação:
                      {' '}
                      {score}
                    </p>
                  </div>
                </li>
              ))
            }
          </ul>
          <Link
            to="/"
            data-testid="btn-go-home"
          >
            Jogar novamente
          </Link>
        </div>
      </main>
    );
  }
}
