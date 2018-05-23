import * as constants from './constants';

export const name = 'router';

const initialState = {
  // start with closed nav menu if we're on mobile screen
  showNavigation: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.TOGGLE_NAVIGATION:
      return {
        ...state,
        showNavigation: !state.showNavigation,
      };

    default:
      return state;
  }
}
