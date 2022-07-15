import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  readFavoritePokemonIds,
  updateFavoritePokemons,
} from './services/pokedexService';

import pokemons from './data';
import Routes from './routes';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isPokemonFavoriteById: this.setIsPokemonFavoriteById() };
  }

  onUpdateFavoritePokemons(pokemonId, isFavorite) {
    updateFavoritePokemons(pokemonId, isFavorite);

    this.setState(({ isPokemonFavoriteById: this.setIsPokemonFavoriteById() }));
  }

  setIsPokemonFavoriteById() {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});

    return isPokemonFavorite;
  }

  render() {
    const { isPokemonFavoriteById } = this.state;
    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);

    return (
      <div className="App">
        <h1>Pokédex</h1>
        <nav>
          <Link className="link" to="/">{`Home`}</Link>
          <Link className="link" to="/about">{`About`}</Link>
          <Link className="link" to="/favorites">{`Favorite Pokémons`}</Link>
        </nav>
        <Routes
          favoritePokemons={ favoritePokemons }
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
          onUpdateFavoritePokemons={
            (pokemonId, checked) => this.onUpdateFavoritePokemons(pokemonId, checked)
          }
        />
      </div>
    );
  }
}

export default App;
