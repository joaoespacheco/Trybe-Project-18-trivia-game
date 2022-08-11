import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import { apiQuestionResponse, apiTokenResponse } from './mocks/mockData';
import Game from '../pages/Game';
import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando a página Game', () => {
  it.skip('Testa se os elementos são renderizados na tela', async () => {
    global.fetch = (url) => (
      Promise.resolve({
        json: () => {
          if(url.includes('api_token.php')) {
            return Promise.resolve(apiTokenResponse)
          } else {
            return Promise.resolve(apiQuestionResponse)
          }
        },
      })
    );

    const initialState = {
      player: {
        name: 'Peter',
        assertions: 0,
        score: 0,
        gravatarEmail: 'me@peterfritz.dev',
      }
    }

    localStorage.setItem('token', 'peterreidelas')

    renderWithRouterAndRedux(<Route component={Game} />, initialState);
    const userImageUrl = "https://www.gravatar.com/avatar/c39e59009ac8305dc4a8e1544e361b68";

    const userImage = screen.getByTestId('header-profile-picture');
    expect(userImage).toHaveAttribute('src', userImageUrl);

    await waitFor (() => {
      expect(screen.getByTestId('question-text')).toBeInTheDocument();
    });
    const questionText = screen.getByTestId('question-text');
    expect(questionText).toHaveTextContent(/How many colors are there in a rainbow\?/i);

    const wrongAnswers = screen.getAllByTestId(/wrong-answer-\d/);
    expect(wrongAnswers).toHaveLength(3);
    
    const rightAnswer = screen.getByTestId('correct-answer');
    expect(rightAnswer).toBeInTheDocument();
  })

  it.skip('Testa as funcionalidades dos elementos', async () => {
    global.fetch = (url) => (
      Promise.resolve({
        json: () => {
          if(url.includes('api_token.php')) {
            return Promise.resolve(apiTokenResponse)
          } else {
            return Promise.resolve(apiQuestionResponse)
          }
        },
      })
    );

    const initialState = {
      player: {
        name: 'Peter',
        assertions: 0,
        score: 0,
        gravatarEmail: 'me@peterfritz.dev',
      }
    }

    localStorage.setItem('token', '6C65616e64726f6e6573')

    renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitFor (() => {
      expect(screen.getByTestId('question-text')).toBeInTheDocument();
    });
    const rightAnswer = screen.getByTestId('correct-answer');
    userEvent.click(rightAnswer);

    const nextBtn = screen.getByRole('button', {  name: /next/i});
    expect(nextBtn).toBeInTheDocument();

    const userScore = screen.getByTestId("header-score");
    expect(userScore.innerText).not.toBe('0');

    expect(rightAnswer.style.border).toBe('3px solid rgb(6, 240, 15)');

    const wrongAnswers = screen.getAllByTestId(/wrong-answer-\d/);
    expect(wrongAnswers[0].style.border).toBe('3px solid red');

    userEvent.click(nextBtn);
    const questionText = screen.getByTestId('question-text');
    expect(questionText).not.toHaveTextContent(/How many colors are there in a rainbow\?/i);
    expect(rightAnswer.style.border).toBe('');
  })

  it('Testando se a aplicação vai até a página de feedback', async () => {
    global.fetch = (url) => (
      Promise.resolve({
        json: () => {
          if(url.includes('api_token.php')) {
            return Promise.resolve(apiTokenResponse)
          } else {
            return Promise.resolve(apiQuestionResponse)
          }
        },
      })
    );

    const initialState = {
      player: {
        name: 'Peter',
        assertions: 0,
        score: 0,
        gravatarEmail: 'me@peterfritz.dev',
      }
    }

    localStorage.setItem('token', '6C65616e64726f6e6573')

    renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitFor (() => {
      expect(screen.getByTestId('question-text')).toBeInTheDocument();
    });

    apiQuestionResponse.results.forEach(() => {
      const rightAnswer = screen.getByTestId('correct-answer');
      userEvent.click(rightAnswer);
      const nextBtn = screen.getByTestId('btn-next');
      userEvent.click(nextBtn);
    })
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();
  })

  it('Testa se após 30 segundos a resposta é errada', async () => {
    jest.setTimeout(35000);

    global.fetch = (url) => (
      Promise.resolve({
        json: () => {
          if(url.includes('api_token.php')) {
            return Promise.resolve(apiTokenResponse)
          } else {
            return Promise.resolve(apiQuestionResponse)
          }
        },
      })
    );

    const initialState = {
      player: {
        name: 'Peter',
        assertions: 0,
        score: 0,
        gravatarEmail: 'me@peterfritz.dev',
      }
    }

    localStorage.setItem('token', '6C65616e64726f6e6573')

    renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitFor (() => {
      expect(screen.getByTestId('question-text')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('btn-next')).toBeInTheDocument();
    }, {
      timeout: 35000,
    })

    const wrongAnswers = screen.getAllByTestId(/wrong-answer-\d/);
    expect(wrongAnswers[0].style.border).toBe('3px solid red');

    const rightAnswer = screen.getByTestId('correct-answer');
    expect(rightAnswer.style.border).toBe('3px solid rgb(6, 240, 15)');
  })
})