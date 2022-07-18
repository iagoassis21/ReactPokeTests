import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste da aplicação toda', () => {
  it(`Teste se é exibida na tela a mensagem No favorite pokemon found,
    caso a pessoa não tenha pokémons favoritos;`, () => {
    renderWithRouter(<App />);
    const favApp = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favApp);
    expect(favApp).toBeInTheDocument();
    const noFavoriteFound = screen.getByText(/no favorite pokemon found/i);
    expect(noFavoriteFound).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados;', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);
    const headingPokeDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(headingPokeDetails).toBeDefined();
    const checkboxFav = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(checkboxFav);
    const favApp = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favApp);
    expect(screen.getByText(/pikachu/i));
  });
});
