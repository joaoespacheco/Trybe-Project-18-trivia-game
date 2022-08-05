import { combineReducers } from 'redux';
import player from './player';
import session from './session';

const rootReducer = combineReducers({
  player,
  session,
});

export default rootReducer;
