import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { changeSettings as changeSettingsAction } from '../redux/actions';
import { getCategories } from '../services/triviaAPI';

class Settings extends Component {
  state = {
    categories: [],
    amount: '5',
    category: '0',
    difficulty: '0',
    type: '0',
  };

  componentDidMount = async () => {
    try {
      const {
        amount,
        category,
        difficulty,
        type,
      } = this.props;

      const categories = await getCategories();

      this.setState({
        categories,
        amount,
        category,
        difficulty,
        type,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  }

  handleSave = (event) => {
    event.preventDefault();

    const {
      amount,
      category,
      difficulty,
      type,
    } = this.state;

    const {
      changeSettings,
      history,
    } = this.props;

    changeSettings(
      amount,
      category,
      difficulty,
      type,
    );

    history.push('/');
  }

  render() {
    const {
      categories,
      amount,
      category,
      difficulty,
      type,
    } = this.state;
    return (
      <div>
        <h1 data-testid="settings-title">
          Configurações
        </h1>
        <form
          onSubmit={ this.handleSave }
        >
          <label htmlFor="amount">
            Número de perguntas
            <input
              id="amount"
              type="number"
              value={ amount }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="category">
            Selecione a categoria
            <select
              id="category"
              value={ category }
              onChange={ this.handleChange }
            >
              <option value="0">
                Any category
              </option>
              {categories.map(({ id, name }) => (
                <option value={ id } key={ id }>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Selecione a dificuldade
            <select
              id="difficulty"
              value={ difficulty }
              onChange={ this.handleChange }
            >
              <option value="0">
                Any difficulty
              </option>
              <option value="easy">
                Easy
              </option>
              <option value="medium">
                Medium
              </option>
              <option value="hard">
                Hard
              </option>
            </select>
          </label>
          <label htmlFor="type">
            Selecione o tipo
            <select
              id="type"
              value={ type }
              onChange={ this.handleChange }
            >
              <option value="0">
                Any type
              </option>
              <option value="multiple">
                Multiple Choice
              </option>
              <option value="boolean">
                True / False
              </option>
            </select>
          </label>
          <Link to="/">
            <button type="button">
              Return
            </button>
          </Link>
          <button
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  amount: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  changeSettings: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  amount: state.settings.amount,
  category: state.settings.category,
  difficulty: state.settings.difficulty,
  type: state.settings.type,
});

const mapDispatchToProps = (dispatch) => ({
  changeSettings: (
    amount,
    category,
    difficulty,
    type,
  ) => dispatch(changeSettingsAction(
    amount,
    category,
    difficulty,
    type,
  )),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
