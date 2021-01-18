import {TaskGenerator, TaskGeneratorMap} from 'src/types/TaskFactoryTypes';
import {SetRecognitionTask, Task} from 'src/types/TaskTypes';

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
