import React from 'react';
import {compose, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import reducer from './js/reducers/Reducers';
import appSagas from './js/sagas/AppSagas';
import ttsSagas from './js/sagas/TTSSagas';
import cameraSagas from './js/sagas/CameraSagas';
import AppView from './js/views/AppView';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

export default function App() {
    return (
        <Provider store={store}>
            <AppView />
        </Provider>
    );
}

sagaMiddleware.run(appSagas);
sagaMiddleware.run(ttsSagas);
sagaMiddleware.run(cameraSagas);
