import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FavoriteInput extends Component {
  render() {
    const { onUpdateFavoritePokemons, isFavorite } = this.props;
    return (
      <form className="favorite-form">
        <label htmlFor="favorite">
          { `Pokémon favoritado?` }
          <input
            type="checkbox"
            id="favorite"
            checked={ isFavorite }
            onChange={
              ({ target: { checked } }) => onUpdateFavoritePokemons(checked)
            }
          />
        </label>
      </form>
    );
  }
}

FavoriteInput.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onUpdateFavoritePokemons: PropTypes.func.isRequired,
};

export default FavoriteInput;
