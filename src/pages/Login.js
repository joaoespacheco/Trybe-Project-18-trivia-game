import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaCog } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { saveScore, userLogin } from '../redux/actions/index';
import { getToken } from '../services/triviaAPI';

import styles from '../styles/Login.module.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
  }

  componentDidMount() {
    const { sendScore } = this.props;

    sendScore(0, 0);
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  }

  handleLogin = async () => {
    const { history, setUserLogin } = this.props;
    const { email, name } = this.state;
    await getToken();
    setUserLogin(email, name);
    history.push('/game');
  }

  render() {
    const {
      name,
      email,
    } = this.state;

    return (
      <main className={ styles.main }>
        <div>
          <p className="logo">
            <Logo className="h-50" />
          </p>
          <Link
            data-testid="btn-settings"
            title="Settings"
            to="/settings"
          >
            <span className="sr-only">Configurações</span>
            <FaCog />
          </Link>
          <form>
            <label htmlFor="name">
              Nickname
              <input
                data-testid="input-player-name"
                autoComplete="username"
                id="name"
                type="text"
                placeholder="Chuck Norris"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              E-mail
              <input
                data-testid="input-gravatar-email"
                autoComplete="email"
                id="email"
                type="email"
                placeholder="chuck@norris.dev"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !email || !name }
              onClick={ this.handleLogin }
            >
              Play
            </button>
          </form>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setUserLogin: PropTypes.func.isRequired,
  sendScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserLogin: (email, name) => dispatch(userLogin(email, name)),
  sendScore: (score, assertions) => dispatch(saveScore(score, assertions)),
});

export default connect(null, mapDispatchToProps)(Login);
