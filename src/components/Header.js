import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="foto de perfil"
          data-testid="header-profile-picture"
          height="300px"
        />
        <h2
          data-testid="header-player-name"
        >
          { name }
        </h2>
        <h2
          data-testid="header-score"
        >
          { score }
        </h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
