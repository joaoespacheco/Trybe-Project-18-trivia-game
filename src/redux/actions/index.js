export const LOGIN = 'LOGIN';
export const SAVE_SCORE = 'SAVE_SCORE';
export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';

export const userLogin = (email, name) => ({
  type: LOGIN,
  email,
  name,
});

export const saveScore = (score, assertions) => ({
  type: SAVE_SCORE,
  score,
  assertions,
});

export const changeSettings = (
  amount,
  category,
  difficulty,
  type,
) => ({
  type: CHANGE_SETTINGS,
  payload: {
    amount,
    category,
    difficulty,
    type,
  },
});
