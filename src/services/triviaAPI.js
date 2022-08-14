import { decodeHTML5 } from 'entities';

export const getToken = async () => {
  const res = await fetch('https://tryvia.ptr.red/api_token.php?command=request');
  const json = await res.json();

  if (json.response_code !== 0) {
    throw new Error('Não foi possível gerar um token');
  }

  localStorage.setItem('token', json.token);
};

export const getQuestions = async (settings) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`https://tryvia.ptr.red/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}&token=${token}`);
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
      question: decodeHTML5(question),
      options: [
        ...incorrectAnswers.map((answer, index) => (
          {
            text: decodeHTML5(answer),
            correct: false,
            index,
          }
        )),
        {
          text: decodeHTML5(correctAnswer),
          correct: true,
          index: true,
        },
      ].sort(() => Math.random() - (1 / 2)),
    };
  });
};

export const getCategories = async () => {
  const res = await fetch('https://tryvia.ptr.red/api_category.php');
  const json = await res.json();

  return [
    {
      id: '0',
      name: 'Qualquer categoria',
    },
    ...json.trivia_categories,
  ];
};
