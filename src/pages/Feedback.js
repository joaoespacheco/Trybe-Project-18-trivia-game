import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  playerPerformance = () => {
    const { assertions } = this.props;
    const minAssertions = 3;
    if (assertions < minAssertions) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  render() {
    return (
      <main>
        <h2 data-testid="feedback-text">{this.playerPerformance()}</h2>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
