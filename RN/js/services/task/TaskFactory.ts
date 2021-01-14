import * as cameraFactory from 'src/services/task/CameraTaskFactory';
import * as voiceFactory from 'src/services/task/RecognitionTaskFactory';
import * as utilityFactory from 'src/services/task/UtilityTaskFactory';
import * as ttsFactory from 'src/services/task/TTSTaskFactory';
import * as visualFactory from 'src/services/task/VisualTaskFactory';

import {TaskGenerator, TaskGeneratorMap} from 'src/types/TaskFactoryTypes';
import {Task, TaskResult} from 'src/types/TaskTypes';

const taskTypeHandlers: TaskGeneratorMap = Object.assign(
    {},
    cameraFactory.FactoryForTypes,
    voiceFactory.FactoryForTypes,
    utilityFactory.FactoryForTypes,
    ttsFactory.FactoryForTypes,
    visualFactory.FactoryForTypes,
);

// TODO Need to initialize supported typed to avoid circular dependancies!
// See UtilityTaskFactory
export function getGeneratorForTask(
    task: Task,
    previousResult?: TaskResult,
): TaskGenerator | null {
    let factory = taskTypeHandlers[task.type];
    if (factory != null) {
        return factory(task, previousResult);
    }
    return null;
}
