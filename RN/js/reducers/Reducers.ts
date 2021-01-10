import visualReducer from 'src/reducers/VisualReducer';
import appReducer from 'src/reducers/AppReducer';
import cameraReducer from 'src/reducers/CameraReducer';
import speechReducer from 'src/reducers/TTSReducer';
import taskReducer from 'src/reducers/TaskReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    app: appReducer,
    camera: cameraReducer,
    visual: visualReducer,
    tts: speechReducer,
    task: taskReducer,
});

export default reducers;
