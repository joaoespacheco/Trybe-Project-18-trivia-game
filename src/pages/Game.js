import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import { getQuestions } from '../services/triviaAPI';

export default class Game extends Component {
  state = {
    // assertions: 0,
    score: 0,
    questions: [],
    currentQuestion: 0,
  }

  componentDidMount = async () => {
    const { history } = this.props;

    try {
      const questions = await getQuestions();

      this.setState({
        questions,
      });
    } catch (err) {
      history.push('/');
    }
  }

  render() {
    const { score, questions, currentQuestion } = this.state;

    return (
      <main>
        <Header score={ score } />
        <div>Game</div>
        {
          questions.length && <Question question={ questions[currentQuestion] } />
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
