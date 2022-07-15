import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

class Button extends React.Component {
  render() {
    const {
      className,
      children,
      disabled,
      onClick,
      dataTestId,
    } = this.props;

    return (
      <button
        onClick={ onClick }
        className={ `button-text ${className}` }
        disabled={ disabled }
        data-testid={ dataTestId }
        type="button"
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  dataTestId: '',
};

export default Button;
