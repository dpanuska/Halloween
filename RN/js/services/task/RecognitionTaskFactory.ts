import {TaskGenerator, TaskGeneratorMap} from 'types/TaskFactoryTypes';
import {SetRecognitionTask, Task} from 'types/TaskTypes';

const RecognitionTasks = {
    SetRecognition: 'SET_RECOGNITION',
};

export const FactoryForTypes: TaskGeneratorMap = {
    [RecognitionTasks.SetRecognition]: getRecognitionGenerator,
};

function getRecognitionGenerator(): TaskGenerator | null {
    return null;
}

function isSetRecognitionTask(task: Task): task is SetRecognitionTask {
    return typeof task.recognition === 'string';
}
