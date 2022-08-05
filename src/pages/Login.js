import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getToken from '../services/triviaAPI';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  }

  handleLogin = async () => {
    const { history } = this.props;
    await getToken();

    history.push('/game');
  }

  render() {
    const {
      name,
      email,
    } = this.state;

    return (
      <main>
        <form>
          <label htmlFor="input-player-name">
            Player name:
            <input
              data-testid="input-player-name"
              autoComplete="off"
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Player e-mail:
            <input
              data-testid="input-gravatar-email"
              autoComplete="off"
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
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
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
