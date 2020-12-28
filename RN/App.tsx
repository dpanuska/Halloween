/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {compose, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import reducer from './js/reducers/Reducers';
import speechSagas from './js/sagas/TextToSpeechSagas';
import AppView from './js/views/AppView';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

const App: () => React.ReactNode = () => {
  return (
    <Provider store={store}>
      <AppView />
    </Provider>
  );
};

sagaMiddleware.run(speechSagas);

export default App;
