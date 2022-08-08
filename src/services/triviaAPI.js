export const getToken = async () => {
  const res = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await res.json();

  if (json.response_code !== 0) {
    throw new Error('Não foi possível gerar um token');
  }

  localStorage.setItem('token', json.token);
};

const DEFAULT_AMOUNT = 5;

export const getQuestions = async (questionsAmount = DEFAULT_AMOUNT) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`);
  const json = await res.json();

  if (!token || json.response_code !== 0) {
    localStorage.removeItem('token');
    throw new Error('Token inválido');
  }

  return json.results.map((q) => {
    const {
      category,
      type,
      difficulty,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = q;

    return {
      category,
      type,
      difficulty,
      question,
      options: [
        ...incorrectAnswers.map((answer, index) => (
          {
            text: answer,
            correct: false,
            index,
          }
        )),
        {
          text: correctAnswer,
          correct: true,
          index: true,
        },
      ].sort(() => Math.random() - (1 / 2)),
    };
  });
};
