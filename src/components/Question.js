import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Option from './Option';

export default class Question extends Component {
  render() {
    const { question, handleAnswer, answered } = this.props;
    return (
      <section>
        <p
          data-testid="question-category"
        >
          {question.category}
        </p>
        <h2
          data-testid="question-text"
        >
          {question.question}
        </h2>
        <p>
          Difficulty&nbsp;
          <span>{question.difficulty}</span>
        </p>
        <div data-testid="answer-options">
          {
            question.options.map((option) => (
              <Option
                key={ option.index }
                option={ option }
                handleAnswer={ handleAnswer }
                answered={ answered }
              />
            ))
          }
        </div>
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        correct: PropTypes.bool,
        index: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.bool,
        ]),
      }),
    ),
  }).isRequired,
  handleAnswer: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
};
