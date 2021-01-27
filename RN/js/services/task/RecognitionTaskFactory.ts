import {startRecognition} from 'src/redux/actions/VoiceRecognitionActions';
import {startRecognitionSaga} from 'src/redux/sagas/VoiceRecognitionSagas';
import {TaskGenerator, TaskGeneratorMap} from 'types/TaskFactoryTypes';
import {SetRecognitionTask, Task} from 'types/TaskTypes';

const RecognitionTasks = {
    StartRecognition: 'START_RECOGNITION',
    StopRecognition: 'STOP_RECOGNITION',
};

export const FactoryForTypes: TaskGeneratorMap = {
    [RecognitionTasks.StartRecognition]: getRecognitionGenerator,
};

function getRecognitionGenerator(task: Task): TaskGenerator | null {
    if (isSetRecognitionTask(task)) {
        return {
            generator: startRecognitionSaga,
            action: startRecognition(task.configurations),
        };
    }

    return null;
}

function isSetRecognitionTask(task: Task): task is SetRecognitionTask {
    if (task.configutations != null) {
        for (let config of task.configurations) {
            if (
                typeof config.taskType !== 'string' ||
                !Array.isArray(config.words)
            ) {
                return false;
            }
        }
        return true;
    }
    return false;
}
