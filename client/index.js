import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import App from './main';
import configureStore from './store';

const { store, persistor } = configureStore();

render(
  <App store={store} persistor={persistor} />,
  document.getElementById('app'),
);
