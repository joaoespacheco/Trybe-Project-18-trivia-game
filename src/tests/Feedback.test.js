import { screen } from '@testing-library/react';
import React from 'react';
import Feedback from '../pages/Feedback';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import md5 from 'crypto-js/md5';

describe('Testando a página de Feedback', () => {
  it('Testa se os elementos necessários são renderizados na tela', () => {
    const initialState = {
      player: {
        name: 'Leandro',
        assertions: 2,
        score: 100,
        gravatarEmail: 'leandro@email.com',
      }
    }

    const { gravatarEmail } = initialState.player;

    renderWithRouterAndRedux(<Feedback />, initialState);
    
    const userImageUrl = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`

    const userImage = screen.getByTestId('header-profile-picture');
    expect(userImage).toHaveAttribute('src', userImageUrl);

    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent(/could be better.../i);
  })

  it('Testa se o texto de feedback muda conforme o número de acertos', () => {
    const initialState = {
      player: {
        name: 'Leandro',
        assertions: 3,
        score: 100,
        gravatarEmail: 'leandro@email.com',
      }
    }

    renderWithRouterAndRedux(<Feedback />, initialState);

    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent(/well done!/i);
  })
})