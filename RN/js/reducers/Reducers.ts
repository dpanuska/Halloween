import visualReducer from './VisualReducer';
import appReducer from './AppReducer';
import speechReducer from './SpeechReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    app: appReducer,
    visual: visualReducer,
    speech: speechReducer,
});

export default reducers;
