import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Ranking from '../pages/Ranking';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa a tela de ranking', () => {
  it('Testa se o ranking é renderizado', () => {
    const ranking = JSON.stringify([{
      name: 'Qualquer um',
      score: 100,
      picture: 'https://live.staticflickr.com/5300/5548348330_801466117f_b.jpg',
    },
    {
      name: 'Leandro',
      score: 9000,
      picture: 'https://citacoes.in/media/authors/none_HX4OfFY.jpeg',
    }
  ])
    
    localStorage.setItem('ranking', ranking);
    renderWithRouterAndRedux(<Ranking />);

    const firstUserRanking = screen.getByTestId('player-name-0');
    expect(firstUserRanking).toHaveTextContent('Leandro');

    const secondUserRanking = screen.getByTestId('player-name-1');
    expect(secondUserRanking).toHaveTextContent('Qualquer um');

    const titleRanking = screen.getByTestId('ranking-title');
    expect(titleRanking).toBeInTheDocument();
  })

  it('Testa se o botão para a página inicial é renderizado', () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);

    const homeLink = screen.getByTestId('btn-go-home');
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  })
})