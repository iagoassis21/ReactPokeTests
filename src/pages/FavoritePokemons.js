import React from 'react';
import PropTypes from 'prop-types';

import { pokemonType } from '../types';

import './favorite-pokemons.css';
import { Pokemon } from '../components';

const ZERO = 0;

class FavoritePokemons extends React.Component {
  render() {
    const { pokemons } = this.props;
    const isEmpty = pokemons.length === ZERO;

    return (
      <div>
        <h2>Favorite pokémons</h2>
        { isEmpty ? (
          <div>
            <p>{ `No favorite pokemon found` }</p>
          </div>
        ) : (
          pokemons.map((pokemon) => (
            <div key={ pokemon.id } className="favorite-pokemon">
              <Pokemon pokemon={ pokemon } isFavorite />
            </div>
          ))
        ) }
      </div>
    );
  }
}

FavoritePokemons.propTypes = {
  pokemons: PropTypes.arrayOf(pokemonType.isRequired),
};

FavoritePokemons.defaultProps = {
  pokemons: [],
};

export default FavoritePokemons;
