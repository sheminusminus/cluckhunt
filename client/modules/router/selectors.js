import { createSelector } from 'reselect';

import { name } from './reducer';

const getState = state => state[name];
const getProps = (state, props) => props;

export const getShowNavigation = createSelector(
  [getState],
  state => state.showNavigation,
);

export const getLocation = createSelector(
  [getProps],
  props => props.location,
);

export const getPathname = createSelector(
  [getLocation],
  loc => (loc ? loc.pathname : ''),
);

export const getMatch = createSelector(
  [getProps],
  props => props.match,
);

export const getParams = createSelector(
  [getMatch],
  match => (match ? match.params : {}),
);

export const getQuery = createSelector(
  [getLocation],
  loc => (loc ? loc.search : {}),
);
