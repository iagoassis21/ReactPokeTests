import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(`Teste se as informações detalhadas do pokémon
        selecionado são mostradas na tela:`, () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);
  });
  it(`A página deve conter um texto <name> Details,
   onde <name> é o nome do pokémon;`, () => {
    const pokeDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokeDetails).toBeDefined();
  });
  it(`Não deve existir o link de navegação
    para os detalhes do pokémon selecionado;`, () => {
    const pokeDetails = screen.queryByText('heading', { name: /pikachu details/i });
    expect(pokeDetails).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary;', () => {
    const summaryDetails = screen.getByRole('heading', { name: /summary/i });
    expect(summaryDetails).toBeInTheDocument();
  });
  it(`A seção de detalhes deve conter um parágrafo
   com o resumo do pokémon específico sendo visualizado.`, () => {
    const specificDetails = screen.getByText(/this intelligent pokémon roasts hard/i);
    expect(specificDetails).toBeDefined();
  });

  it(`Na seção de detalhes deverá existir um heading h2 com o texto
    Game Locations of <name>; onde <name> é o nome do pokémon exibido;`, () => {
    const pokeLocation = screen.getByRole('heading',
      { name: /game locations of pikachu/i });
    expect(pokeLocation).toBeDefined();
  });
  it('Todas as localizações do pokémon devem ser mostradas na seção de detalhes;', () => {
    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    expect(location1).toBeDefined();
    expect(location2).toBeDefined();
  });
  it(`Devem ser exibidos o nome da localização
      e uma imagem do mapa em cada localização;`, () => {
    // pokemons.forEach(({ foundAt }) => {
    //   const imageLocation = screen.getByRole('img', { name: foundAt.location });
    //   expect(imageLocation).toHaveProperty('src', foundAt.map);
    // });
    const imageLocation = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(imageLocation[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageLocation[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it(`A seção de detalhes deve conter um parágrafo
   com o resumo do pokémon específico sendo visualizado.`, () => {
    const specificDetails = screen.getByText(/this intelligent pokémon roasts hard/i);
    expect(specificDetails).toBeDefined();
  });

  it('A página deve exibir um checkbox que permite favoritar o pokémon;', () => {
    const pokeFavCheck = screen.getByText(/pokémon favoritado\?/i);
    expect(pokeFavCheck).toHaveTextContent(/pokémon favoritado\?/i);
  });
  it(`Cliques alternados no checkbox devem adicionar e remover
    respectivamente o pokémon da lista de favoritos;`, () => {
    const pokeFavCheck = screen.getByText(/pokémon favoritado\?/i);
    expect(pokeFavCheck).toBeDefined();
    userEvent.click(pokeFavCheck);
    const startIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(startIcon).toBeInTheDocument();
    userEvent.click(pokeFavCheck);
    const pokeDetails = screen.queryByText('img',
      { name: /pikachu is marked as favorite/i });
    expect(pokeDetails).not.toBeInTheDocument();
  });
});
