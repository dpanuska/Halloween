import visualReducer from 'src/redux/reducers/VisualReducer';
import appReducer from 'src/redux/reducers/AppReducer';
import cameraReducer from 'src/redux/reducers/CameraReducer';
import speechReducer from 'src/redux/reducers/TTSReducer';
import taskReducer from 'src/redux/reducers/TaskReducer';
import voiceReducer from 'src/redux/reducers/VoiceRecognitionReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    app: appReducer,
    camera: cameraReducer,
    visual: visualReducer,
    tts: speechReducer,
    task: taskReducer,
    voice: voiceReducer,
});

export default reducers;
