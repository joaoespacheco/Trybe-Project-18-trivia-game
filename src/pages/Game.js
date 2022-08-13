import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
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

  theme = new Audio(encodeURI('/Rinse Repeat - DivKid.mp3'))

  maravilhoso = new Audio('/maravilhoso.mp3');

  errou = new Audio('/errou.mp3');

  componentDidMount = async () => {
    const {
      amount,
      category,
      difficulty,
      type,
      history,
    } = this.props;

    try {
      const questions = await getQuestions({
        amount,
        category,
        difficulty,
        type,
      });

      this.setState({
        questions,
      });

      this.initTimer();
    } catch (err) {
      history.push('/');
    }

    this.theme.addEventListener('ended', () => {
      this.theme.play();
    });

    this.theme.volume = 0.05;
    this.maravilhoso.volume = 0.25;
    this.errou.volume = 0.10;
    this.theme.play();
  }

  handleAnswer = (correct) => {
    this.stopTimer();

    this.playAudio(correct);

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

    this.theme.pause();
    this.theme.removeEventListener('ended', () => this.theme.stop());
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
        elapsedTime: 0,
        answered: false,
      }));

      this.initTimer();
    } else {
      this.saveRankingInLocalStorage();
      history.push('/feedback');
    }
  }

  playAudio = (correct) => {
    if (correct) {
      return this.maravilhoso.play();
    }
    return this.errou.play();
  };

  render() {
    const { questions, currentQuestion, answered, elapsedTime } = this.state;

    return (
      <main>
        <Header />
        <div>Game</div>
        <p>{ MAX_TIME - elapsedTime }</p>
        <p>{`${currentQuestion + 1} / ${questions.length}`}</p>
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
  amount: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  amount: state.settings.amount,
  category: state.settings.category,
  difficulty: state.settings.difficulty,
  type: state.settings.type,
});

const mapDispatchToProps = (dispatch) => ({
  sendScore: (score, assertions) => dispatch(saveScore(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
