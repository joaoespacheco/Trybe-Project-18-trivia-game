import { CHANGE_SETTINGS } from '../actions';

const INITIAL_STATE = {
  amount: '5',
  category: '0',
  difficulty: '0',
  type: '0',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_SETTINGS:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default settings;
