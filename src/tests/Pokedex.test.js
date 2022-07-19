import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('teste da aplicação toda', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons;', () => {
    renderWithRouter(<App />);
    const homePokemons = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(homePokemons).toBeDefined();
  });
});

describe(`Teste se é exibido o próximo pokémon da lista
quando o botão Próximo pokémon é clicado:`, () => {
  it('O botão deve conter o texto Próximo pokémon;', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemon).toBeDefined();
  });
  it(`Os próximos pokémons da lista devem ser mostrados, 
    um a um, ao clicar sucessivamente no botão;`, () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(nextPokemon);
    });
  });
  it(`O primeiro pokémon da lista deve ser mostrado ao clicar no botão,
    se estiver no último pokémon da lista.`, () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(nextPokemon);
    });
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex tem os botões de filtro:', () => {
  it('', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toHaveTextContent('All');
    userEvent.click(allBtn);
    expect(screen.getByText(/pikachu/i));
  });
  it(`Deve existir um botão de filtragem para cada tipo de pokémon, 
    sem repetição;`, () => {
    renderWithRouter(<App />);
    const quantityFilters = 7;
    const electricBtn = screen.getByRole('button', { name: /electric/i });
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    const bugBtn = screen.getByRole('button', { name: /bug/i });
    const poisonBtn = screen.getByRole('button', { name: /poison/i });
    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    const normalBtn = screen.getByRole('button', { name: /normal/i });
    const dragonBtn = screen.getByRole('button', { name: /dragon/i });
    expect(electricBtn).toBeInTheDocument();
    expect(fireBtn).toBeInTheDocument();
    expect(bugBtn).toBeInTheDocument();
    expect(poisonBtn).toBeInTheDocument();
    expect(psychicBtn).toBeInTheDocument();
    expect(normalBtn).toBeInTheDocument();
    expect(dragonBtn).toBeInTheDocument();
    const allBtns = screen.getAllByTestId('pokemon-type-button').length;
    expect(allBtns).toBe(quantityFilters);
  });
  it(`A partir da seleção de um botão de tipo, 
    a Pokédex deve circular somente pelos pokémons daquele tipo;`, () => {
    renderWithRouter(<App />);
    const fireType = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireType);
    expect(screen.getByText(/charmander/i));
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn);
    expect(screen.getByText(/rapidash/i));
  });
});
