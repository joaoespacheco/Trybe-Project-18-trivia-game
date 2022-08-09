import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import { getQuestions } from '../services/triviaAPI';

let timer = null;

export default class Game extends Component {
  state = {
    // assertions: 0,
    score: 0,
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
    console.log(correct);

    this.stopTimer();

    this.setState({
      answered: true,
    });
  }

  initTimer = () => {
    timer = setInterval(() => {
      const { elapsedTime } = this.state;

      if (elapsedTime === Number([!+[] + !+[] + !+[]] + [+[]])) {
        this.handleAnswer(false);
        return;
      }

      this.setState({
        elapsedTime: elapsedTime + 1,
      });
    }, Number([+!+[]] + [+[]] + [+[]] + [+[]]));
  }

  stopTimer = () => {
    clearInterval(timer);
    timer = null;
  }

  handleChangePage = () => {
    const { currentQuestion } = this.state;
    const { history } = this.props;
    const limitOfIndex = 4;
    if (currentQuestion < limitOfIndex) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        answered: false,
      }));
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { score, questions, currentQuestion, answered } = this.state;

    return (
      <main>
        <Header score={ score } />
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
              onClick={ this.handleChangePage }
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
};
