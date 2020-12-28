import {call, put, takeLatest} from 'redux-saga/effects';
import * as actions from '../constants/ActionTypes';

function* executeTask(action) {
  try {
    let {task} = action.payload;
    var subTask;
    for (subTask in task.taskList) {
      if (subTask.suspend === true) {
        yield call(executeSubTask, subTask);
      } else {
        call(executeSubTask, subTask);
      }
    }
    put({type: actions.SPEECH_TEXT_SUCCEEDED});
  } catch (error) {
    put({type: actions.SPEECH_TEXT_FAILED, error});
  }
}
// TODO should we expect taskList always, or be able to execute
function* executeSubTask(task) {
  try {
  } catch (error) {}
}

// use them in parallel
export default function* rootSaga() {
  yield takeLatest(actions.DISPATCH_TASK_REQUESTED, executeTask);
}
