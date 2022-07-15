import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { isPokemonFavoriteByIdType, pokemonType } from '../types';
import {
  About,
  FavoritePokemons,
  NotFound,
  Pokedex,
  PokemonDetails,
} from '../pages';

class Routes extends Component {
  render() {
    const {
      favoritePokemons, pokemons, isPokemonFavoriteById, onUpdateFavoritePokemons,
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (
            <Pokedex
              pokemons={ pokemons }
              isPokemonFavoriteById={ isPokemonFavoriteById }
            />
          ) }
        />
        <Route
          path="/pokemons/:id"
          render={ ({ match }) => (
            <PokemonDetails
              isPokemonFavoriteById={ isPokemonFavoriteById }
              match={ match }
              pokemons={ pokemons }
              onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
            />
          ) }
        />
        <Route
          path="/favorites"
          render={ () => <FavoritePokemons pokemons={ favoritePokemons } /> }
        />
        <Route path="/about" component={ About } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

Routes.propTypes = {
  onUpdateFavoritePokemons: PropTypes.func.isRequired,
  isPokemonFavoriteById: isPokemonFavoriteByIdType.isRequired,
  pokemons: PropTypes.arrayOf(pokemonType.isRequired).isRequired,
  favoritePokemons: PropTypes.arrayOf(pokemonType.isRequired).isRequired,
};

export default Routes;
