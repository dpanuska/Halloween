import visualReducer from './VisualReducer';
import appReducer from './AppReducer';
import cameraReducer from './CameraReducer';
import speechReducer from './TTSReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    app: appReducer,
    camera: cameraReducer,
    visual: visualReducer,
    speech: speechReducer,
});

export default reducers;
