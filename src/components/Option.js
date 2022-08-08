import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Option extends Component {
  render() {
    const {
      option: {
        index,
        text,
        correct,
      },
      handleAnswer,
      answered,
    } = this.props;

    return (
      <button
        type="button"
        data-testid={ correct ? 'correct-answer' : `wrong-answer-${index}` }
        style={ {
          border: answered ? `3px solid ${correct ? 'rgb(6, 240, 15)' : 'red'}` : 'none',
        } }
        onClick={ () => handleAnswer(correct) }
      >
        {text}
      </button>
    );
  }
}

Option.propTypes = {
  option: PropTypes.shape({
    text: PropTypes.string,
    correct: PropTypes.bool,
    index: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ]),
  }).isRequired,
  handleAnswer: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
};
