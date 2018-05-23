// @flow

import { combineReducers } from 'redux';

import { reducer as router } from '../router';

/**
 * rootReducer
 */
export default combineReducers({
  [router.name]: router.reducer,
});
