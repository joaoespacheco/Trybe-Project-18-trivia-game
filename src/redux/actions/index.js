export const LOGIN = 'LOGIN';
export const SAVE_SCORE = 'SAVE_SCORE';

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
