import React from 'react';
import {compose, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import rootSaga from 'src/sagas/RootSagas';
import reducer from 'src/reducers/Reducers';
import AppView from 'src/views/AppView';
import {TTS_SERVICE_KEY} from 'src/constants/ContextEffects';
import TTSService from 'src/services/TTSService';
import logger from 'src/middleware/logger';

const ttsService = new TTSService();
const sagaMiddleware = createSagaMiddleware({
    context: {
        [TTS_SERVICE_KEY]: ttsService,
    },
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, logger)),
);

export default function App() {
    return (
        <Provider store={store}>
            <AppView />
        </Provider>
    );
}

sagaMiddleware.run(rootSaga);
