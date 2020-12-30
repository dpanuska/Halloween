// import {call, put, takeLatest} from 'redux-saga/effects';
// import * as actions from '../constants/Actions';

// function* executeTask(action) {
//     try {
//         let {task} = action.payload;
//         var subTask;
//         for (subTask in task.taskList) {
//             if (subTask.suspend === true) {
//                 yield call(executeSubTask, subTask);
//             } else {
//                 call(executeSubTask, subTask);
//             }
//         }
//         yield put({type: actions.DISPATCH_TASK_SUCCEEDED});
//     } catch (error) {
//         yield put({type: actions.DISPATCH_TASK_FAILED, error});
//     }
// }
// // TODO should we expect taskList always, or be able to execute
// function* executeSubTask(task) {
//     try {
//     } catch (error) {}
// }

// export default function* rootSaga() {
//     yield takeLatest(actions.DISPATCH_TASK_REQUESTED, executeTask);
// }
