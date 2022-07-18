import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste da aplicação toda', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeApp = screen.getByRole('link', { name: /home/i });
    const aboutApp = screen.getByRole('link', { name: /about/i });
    const favApp = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeApp).toBeInTheDocument();
    expect(aboutApp).toBeInTheDocument();
    expect(favApp).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação;`, () => {
    renderWithRouter(<App />);

    const homeApp = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeApp);

    expect(homeApp).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página de About,
    na URL /about, ao clicar no link About da barra de navegação;`, () => {
    renderWithRouter(<App />);

    const aboutApp = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutApp);

    expect(aboutApp).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
    na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    renderWithRouter(<App />);

    const favApp = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favApp);

    expect(favApp).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página Not Found
   ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');

    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(img).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
