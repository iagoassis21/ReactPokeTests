import React from 'react';
import PropTypes from 'prop-types';

import { isPokemonFavoriteByIdType, pokemonType } from '../types';
import Pokemon from '../components/Pokemon';
import PokemonData from '../components/PokemonData';
import FavoriteInput from '../components/FavoriteInput';

import './pokemon-details.css';

class PokemonDetails extends React.Component {
  findPokemon(givenId) {
    const { pokemons } = this.props;

    return pokemons.find(({ id }) => id === givenId);
  }

  render() {
    const {
      match: { params: { id } },
      isPokemonFavoriteById,
      onUpdateFavoritePokemons,
    } = this.props;

    const pokemon = this.findPokemon(parseInt(id, 10));
    const isFavorite = isPokemonFavoriteById[id];

    return (
      <section className="pokemon-details">
        <h2>{ `${pokemon.name} Details` }</h2>
        <Pokemon
          pokemon={ pokemon }
          showDetailsLink={ false }
          isFavorite={ isFavorite }
        />
        <PokemonData pokemon={ pokemon } />
        <FavoriteInput
          isFavorite={ isFavorite }
          onUpdateFavoritePokemons={
            (checked) => onUpdateFavoritePokemons(pokemon.id, checked)
          }
        />
      </section>
    );
  }
}

PokemonDetails.propTypes = {
  isPokemonFavoriteById: isPokemonFavoriteByIdType.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdateFavoritePokemons: PropTypes.func.isRequired,
  pokemons: PropTypes.arrayOf(pokemonType.isRequired).isRequired,
};

export default PokemonDetails;
