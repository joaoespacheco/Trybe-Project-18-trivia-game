/* eslint-disable react/jsx-max-depth */
import { Listbox } from '@headlessui/react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { changeSettings as changeSettingsAction } from '../redux/actions';
import { difficulties, types } from '../services/data';
import { getCategories } from '../services/triviaAPI';

import styles from '../styles/Settings.module.css';

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
      <main className={ styles.main }>
        <div>
          <h1 data-testid="settings-title">
            Configurações
          </h1>
          <Link to="/" title="Return">
            <FaArrowLeft />
            <span className="sr-only">Return</span>
          </Link>
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
            <Listbox
              className={ styles.select }
              as="section"
              value={ category }
              onChange={ (value) => this.setState({ category: value }) }
            >
              <Listbox.Label
                className={ styles.label }
              >
                Categoria
              </Listbox.Label>
              <Listbox.Button
                className={ styles.button }
              >
                {categories.find(({ id }) => id === category)?.name}
                <span aria-hidden>
                  <FaChevronDown />
                </span>
              </Listbox.Button>
              <Listbox.Options
                className={ styles.options }
              >
                {categories.map(({ id, name }) => (
                  <Listbox.Option
                    className={ ({ active }) => (active ? styles.active : styles.option) }
                    key={ id }
                    value={ id }
                  >
                    {name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
            <Listbox
              className={ styles.select }
              as="section"
              value={ difficulty }
              onChange={ (value) => this.setState({ difficulty: value }) }
            >
              <Listbox.Label
                className={ styles.label }
              >
                Dificuldade
              </Listbox.Label>
              <Listbox.Button
                className={ styles.button }
              >
                {difficulties.find(({ id }) => id === difficulty)?.name}
                <span aria-hidden>
                  <FaChevronDown />
                </span>
              </Listbox.Button>
              <Listbox.Options
                className={ styles.options }
              >
                {difficulties.map(({ id, name }) => (
                  <Listbox.Option
                    className={ ({ active }) => (active ? styles.active : styles.option) }
                    key={ id }
                    value={ id }
                  >
                    {name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
            <Listbox
              className={ styles.select }
              as="section"
              value={ type }
              onChange={ (value) => this.setState({ type: value }) }
            >
              <Listbox.Label
                className={ styles.label }
              >
                Tipo
              </Listbox.Label>
              <Listbox.Button
                className={ styles.button }
              >
                {types.find(({ id }) => id === type)?.name}
                <span aria-hidden>
                  <FaChevronDown />
                </span>
              </Listbox.Button>
              <Listbox.Options
                className={ styles.options }
              >
                {types.map(({ id, name }) => (
                  <Listbox.Option
                    className={ ({ active }) => (active ? styles.active : styles.option) }
                    key={ id }
                    value={ id }
                  >
                    {name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
            <button
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </main>
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
