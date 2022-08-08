export const LOGIN = 'LOGIN';

export const userLogin = (email, name) => ({
  type: LOGIN,
  email,
  name,
});
