import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Logo from '../components/Logo';
import styles from '../styles/Feedback.module.css';

class Feedback extends Component {
  playerPerformance = () => {
    const { assertions, amount } = this.props;
    const minAssertions = 0.7;

    if ((assertions / amount) < minAssertions) {
      return (
        <div
          data-testid="feedback-text"
          className={ styles.meme }
        >
          <img src="/yoda.png" alt="meme do yoda" />
        </div>
      );
    }

    return (
      <div
        data-testid="feedback-text"
        className={ styles.meme }
      >
        <img src="/wellDone.png" alt="meme da foca" />
      </div>
    );
  }

  render() {
    const { score, assertions, gravatarEmail, name } = this.props;

    return (
      <div
        className={ styles.feedbackContainer }
      >
        <header>
          <Logo />
          <Link
            to="/ranking"
            data-testid="btn-ranking"
            title="Ranking"
          >
            <FaTrophy />
          </Link>
        </header>
        <main>
          {this.playerPerformance()}
          <div
            className={ styles.user }
          >
            <h1>Resumo do jogo</h1>
            <img
              src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
              alt="foto de perfil"
              data-testid="header-profile-picture"
              height="300px"
            />
            <h3>{name}</h3>
            <p
              data-testid="feedback-total-score"
            >
              { `Score: ${score}` }
            </p>
            <p
              data-testid="feedback-total-question"
            >
              { `Número de acertos: ${assertions}` }
            </p>
            <Link
              to="/"
              data-testid="btn-play-again"
              className={ styles.buttonPlayAgain }
            >
              Play Again
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  amount: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  amount: state.settings.amount,
});

export default connect(mapStateToProps, null)(Feedback);
