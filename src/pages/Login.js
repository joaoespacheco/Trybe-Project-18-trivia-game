import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getToken from '../services/triviaAPI';
import { userLogin } from '../redux/actions/index';

class Login extends Component {
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
    const { history, getUserLogin } = this.props;
    const { email, name } = this.state;
    await getToken();
    getUserLogin(email, name);
    history.push('/game');
  }

  render() {
    const {
      name,
      email,
    } = this.state;

    return (
      <main>
        <Link
          data-testid="btn-settings"
          to="/settings"
        >
          Configurações
        </Link>
        <form>
          <label htmlFor="name">
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
          <label htmlFor="email">
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

const mapDispatchToProps = (dispatch) => ({
  getUserLogin: (email, name) => dispatch(userLogin(email, name)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getUserLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
