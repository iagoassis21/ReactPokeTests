import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(`Teste se é renderizado um card
        com as informações de determinado pokémon:`, () => {
  it('O nome correto do pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);
    const pokemonName = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonName).toBeDefined();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByText(/average weight: 6\.0 kg/i));
    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it(`Teste se o card do pokémon indicado na Pokédex contém um link
    de navegação para exibir detalhes deste pokémon. 
    O link deve possuir a URL /pokemons/<id>, 
    onde <id> é o id do pokémon exibido;`, () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokeDetails).toBeDefined();
  });
  it(`Teste se ao clicar no link de navegação do pokémon,
    é feito o redirecionamento da aplicação
    para a página de detalhes de pokémon;`, () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);
    expect(screen.getByRole('heading', { name: /pikachu details/i }));
  });
  it('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);
    const checkPokeFav = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(checkPokeFav);
    const startIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(startIcon).toBeInTheDocument();
    expect(startIcon).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
