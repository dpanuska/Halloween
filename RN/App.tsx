import React from 'react';
import {compose, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import rootSaga from 'src/sagas/RootSagas';
import reducer from 'src/reducers/Reducers';
import AppView from 'src/views/AppView';

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

sagaMiddleware.run(rootSaga);
