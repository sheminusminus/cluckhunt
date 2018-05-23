import React, { PureComponent } from 'react';

import { classie } from '../../../../utils';

import { propTypes, defaultProps } from './props';
import styles from './styles.css';

import { LoadingIndicator } from '..';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClickTap = this.handleClickTap.bind(this);
  }

  handleClickTap(evt) {
    const { onClickTap } = this.props;
    onClickTap(evt);
  }

  render() {
    const {
      label,
      className,
      style,
      disabled,
      shadowLayer,
      type,
      loads,
      loading,
    } = this.props;

    const classes = classie([styles.button, className], {
      [styles.shadowLayer]: shadowLayer,
      [styles.loading]: loading,
    });

    let stateContents = null;
    if (loads) {
      stateContents = (
        <LoadingIndicator
          top="51%"
          left="calc(100% / 12)"
          loading={loading} />
      );
    }

    return (
      <button
        type={type}
        onClick={this.handleClickTap}
        disabled={disabled}
        style={style}
        className={classes}>
        {label}
        {stateContents}
      </button>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
