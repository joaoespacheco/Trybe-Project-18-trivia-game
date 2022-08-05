import React, { Component } from 'react';

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
          >
            Play
          </button>
        </form>
      </main>
    );
  }
}
