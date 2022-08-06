const getToken = async () => {
  const res = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await res.json();

  if (json.response_code !== 0) {
    throw new Error('Não foi possível gerar um token');
  }

  localStorage.setItem('token', json.token);
};

export default getToken;
