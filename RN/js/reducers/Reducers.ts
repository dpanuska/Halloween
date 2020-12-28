import visualReducer from './VisualReducers';
import {combineReducers} from 'redux';

const reducers = combineReducers({visual: visualReducer});

export default reducers;
