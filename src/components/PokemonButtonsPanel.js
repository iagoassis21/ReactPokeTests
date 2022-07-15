import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Button from './Button';

class PokemonButtonsPanel extends Component {
  render() {
    const { pokemonTypes, filterPokemons } = this.props;
    return (
      <div className="pokedex-buttons-panel">
        <Button
          onClick={ () => filterPokemons('all') }
          className="filter-button"
        >
          All
        </Button>
        {pokemonTypes.map((type) => (
          <Button
            dataTestId={`pokemon-type-button`}
            key={ type }
            onClick={ () => filterPokemons(type) }
            className="filter-button"
          >
            {`${type}`}
          </Button>
        ))}
      </div>
    );
  }
}

PokemonButtonsPanel.propTypes = {
  pokemonTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterPokemons: PropTypes.func.isRequired,
};

export default PokemonButtonsPanel;
