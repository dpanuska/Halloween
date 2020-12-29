import visualReducer from './VisualReducers';
import appReducer from './AppReducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  app: appReducer,
  visual: visualReducer,
});

export default reducers;
