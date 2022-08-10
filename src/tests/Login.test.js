import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { apiQuestionResponse, apiTokenResponse } from './mocks/mockData';

const inputPlayerName = 'input-player-name';
const inputGravatarEmail = 'input-gravatar-email';

describe('Testando a página de Login', () => {
  it('Testando se os inputs são renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId(inputPlayerName);
    const emailInput = screen.getByTestId(inputGravatarEmail);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  it('Testando se os botões são renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const playButton = screen.getByTestId('btn-play');
    const settingsButton = screen.getByTestId('btn-settings');

    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });

  it('Testando a validação do botão Play', () => {
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId(inputPlayerName);
    const emailInput = screen.getByTestId(inputGravatarEmail);
    const playButton = screen.getByTestId('btn-play');

    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, 'Leandro');

    expect(playButton).toBeDisabled();

    userEvent.type(emailInput, 'leandro@email.com');

    expect(playButton).toBeEnabled();
  });

  it('Testando a mudança de rota ao clicar no botão Play', async () => {
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

    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId(inputPlayerName);
    const emailInput = screen.getByTestId(inputGravatarEmail);
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(nameInput, 'Leandro');
    userEvent.type(emailInput, 'leandro@email.com');

    userEvent.click(playButton);

    await waitFor(() => {
      expect(playButton).not.toBeInTheDocument();
    });

    expect(history.location.pathname).toBe('/game');
  });
});
