import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

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
      <div>
        <Header />
        <main>
          <h2 data-testid="feedback-text">{this.playerPerformance()}</h2>
        </main>
      </div>
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
