import visualReducer from './VisualReducers';
import appReducer from './AppReducer';
import speechReducer from './SpeechReducers';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    app: appReducer,
    visual: visualReducer,
    speech: speechReducer,
});

export default reducers;
