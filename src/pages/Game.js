import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import { saveScore } from '../redux/actions';
import { getQuestions } from '../services/triviaAPI';

let timer = null;

const MAX_TIME = 30;
const POINTS = 10;
const ONE_SECOND = 1000;

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    answered: false,
    elapsedTime: 0,
  }

  componentDidMount = async () => {
    const { history } = this.props;

    try {
      const questions = await getQuestions();

      this.setState({
        questions,
      });

      this.initTimer();
    } catch (err) {
      history.push('/');
    }
  }

  handleAnswer = (correct) => {
    this.stopTimer();

    this.updateScore(correct);

    this.setState({
      answered: true,
    });
  }

  updateScore = (correct) => {
    const { score, assertions, sendScore } = this.props;
    const { questions, currentQuestion, elapsedTime } = this.state;

    const difficulties = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    const difficulty = difficulties[questions[currentQuestion].difficulty];

    if (correct) {
      const presentScore = POINTS + ((MAX_TIME - elapsedTime) * difficulty);
      sendScore(score + presentScore, assertions + 1);
    }
  }

  initTimer = () => {
    timer = setInterval(() => {
      const { elapsedTime } = this.state;

      if (elapsedTime === MAX_TIME) {
        this.handleAnswer(false);
        return;
      }

      this.setState({
        elapsedTime: elapsedTime + 1,
      });
    }, ONE_SECOND);
  }

  stopTimer = () => {
    clearInterval(timer);
    timer = null;
  }

  componentWillUnmount = () => {
    this.stopTimer();
  }

  saveRankingInLocalStorage = () => {
    const { name, score, gravatarEmail } = this.props;

    if (name) {
      const picture = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
      const rankingObj = { name, score, picture };
      const savedRanking = JSON.parse(localStorage.getItem('ranking') || '[]');

      localStorage.setItem('ranking', JSON.stringify([...savedRanking, rankingObj]));
    }
  }

  handleNext = () => {
    const { questions, currentQuestion } = this.state;
    const { history } = this.props;

    if (currentQuestion < questions.length - 1) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        answered: false,
      }));
    } else {
      this.saveRankingInLocalStorage();
      history.push('/feedback');
    }
  }

  render() {
    const { questions, currentQuestion, answered } = this.state;

    return (
      <main>
        <Header />
        <div>Game</div>
        {
          questions.length && <Question
            question={ questions[currentQuestion] }
            handleAnswer={ this.handleAnswer }
            answered={ answered }
          />
        }
        {
          answered
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNext }
            >
              Next
            </button>
          )
        }
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  sendScore: (score, assertions) => dispatch(saveScore(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);