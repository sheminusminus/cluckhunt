import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string,
  onClickTap: PropTypes.func,
  disabled: PropTypes.bool,
  shadowLayer: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
  loads: PropTypes.bool,
};

const defaultProps = {
  className: '',
  style: {},
  label: '',
  onClickTap: () => {},
  disabled: false,
  shadowLayer: false,
  type: 'button',
  loading: false,
  loads: false,
};

export { propTypes, defaultProps };
