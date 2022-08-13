import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';

import styles from '../styles/Header.module.css';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header className={ styles.header }>
        <Logo />
        <div>
          <p
            className="sr-only"
            data-testid="header-player-name"
          >
            { name }
          </p>
          <p
            data-testid="header-score"
          >
            { `Score: ${score}` }
          </p>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="foto de perfil"
            data-testid="header-profile-picture"
            height="300px"
          />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
