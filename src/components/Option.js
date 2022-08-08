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
    } = this.props;

    return (
      <button
        type="button"
        data-testid={ correct ? 'correct-answer' : `wrong-answer-${index}` }
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
};
