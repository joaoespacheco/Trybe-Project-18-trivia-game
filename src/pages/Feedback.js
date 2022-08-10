import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { saveScore } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    this.saveRankingInLocalStorage();
  }

  playerPerformance = () => {
    const { assertions } = this.props;
    const minAssertions = 3;

    if (assertions < minAssertions) {
      return 'Could be better...';
    }

    return 'Well Done!';
  }

  saveRankingInLocalStorage = () => {
    const { name, score, gravatarEmail, sendScore } = this.props;
    if (name) {
      const picture = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
      const rankingObj = { name, score, picture };
      const savedRanking = JSON.parse(localStorage.getItem('ranking') || '[]');
      localStorage.setItem('ranking', JSON.stringify([...savedRanking, rankingObj]));
      sendScore(0, 0);
    }
  }

  render() {
    const { score, assertions } = this.props;

    return (
      <div>
        <Header />
        <main>
          <h2 data-testid="feedback-text">{this.playerPerformance()}</h2>
          <h3
            data-testid="feedback-total-score"
          >
            { score }
          </h3>
          <h3
            data-testid="feedback-total-question"
          >
            { assertions }
          </h3>
          <Link
            to="/"
            data-testid="btn-play-again"
          >
            Play Again
          </Link>
          <Link
            to="/ranking"
            data-testid="btn-ranking"
          >
            Ranking
          </Link>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  sendScore: (score, assertions) => dispatch(saveScore(score, assertions)),
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
