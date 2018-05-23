import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// root app reducer and saga
import root from '../modules/root/reducer';
import rootSaga from '../modules/root/saga';

// configure the redux devtools extension (only `true` in development)
const devtoolsEnabled = process.env.DEVTOOLS_ENABLED;
const composeEnhancers = devtoolsEnabled ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const persistConfig = {
  key: 'root',
  stateReconciler: autoMergeLevel2,
  storage,
};

const persistedReducer = persistReducer(persistConfig, root);

// our redux data store configuration
export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = createStore(
    persistedReducer,
    {},
    composeEnhancers(applyMiddleware(...middleware)),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { persistor, store };
}
