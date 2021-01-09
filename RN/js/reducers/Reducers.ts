import visualReducer from './VisualReducer';
import appReducer from './AppReducer';
import cameraReducer from './CameraReducer';
import speechReducer from './TTSReducer';
import taskReducer from './TaskReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    app: appReducer,
    camera: cameraReducer,
    visual: visualReducer,
    tts: speechReducer,
    task: taskReducer,
});

export default reducers;
