import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste da aplicação toda', () => {
  it('Teste se a página contém as informações sobre a Pokédex;', () => {
    renderWithRouter(<App />);
    const aboutApp = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutApp);

    const titleAboutPokedex = screen.getByRole('heading', { name: /about pokédex/i });

    expect(titleAboutPokedex).toBeDefined();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<App />);
    const aboutApp = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutApp);
    const paragraph1 = screen.getByText(/this application simulates a pokédex/i);
    const paragraph2 = screen.getByText(/one can filter pokémons by type/i);

    expect(paragraph1).toBeDefined();
    expect(paragraph2).toBeDefined();
  });

  it(`Teste se a página contém a seguinte imagem de uma Pokédex: 
    https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`, () => {
    renderWithRouter(<App />);
    const aboutApp = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutApp);

    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
