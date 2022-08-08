import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      gravatarEmail: action.email,
      name: action.name,
    };
  default:
    return state;
  }
};

export default player;
