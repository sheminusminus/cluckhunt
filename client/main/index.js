import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes, ScrollToTop } from '../modules/router/components';

// css normalizer
import '../assets/vendor/normalize.css';
// base (site-wide) styles
import '../modules/core/sharedStyles/base.css';
// typography
import '../modules/core/sharedStyles/typography.css';
// brand colors
import '../modules/core/sharedStyles/palette.css';

const App = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <ScrollToTop>
          <Routes />
        </ScrollToTop>
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
