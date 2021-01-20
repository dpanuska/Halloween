import * as visualActions from 'src/redux/actions/VisualActions';

import {TaskGenerator, TaskGeneratorMap} from 'src/types/TaskFactoryTypes';
import {VisualBackgroundTask, VisualTextTask, Task} from 'types/TaskTypes';

const VisualTasks = {
    Background: 'VISUAL_BACKGROUND',
    BackgroundGif: 'VISUAL_BACKGROUND_GIF',
    BackgroundChained: 'VISUAL_BACKGROUND_CHAINED',
    VisualText: 'VISUAL_TEXT',
    VisualReset: 'VISUAL_RESET',
};

export const FactoryForTypes: TaskGeneratorMap = {
    [VisualTasks.Background]: getBackgroundGenerator,
    [VisualTasks.BackgroundGif]: getBackgroundGenerator,
    [VisualTasks.VisualText]: getTextGenerator,
    [VisualTasks.VisualReset]: getResetGenerator,
    // [VisualTasks.BackgroundChained]: getChainedBackgroundGenerator,
};

function getBackgroundGenerator(task: Task): TaskGenerator | null {
    if (isSetBackgroundTask(task)) {
        return {
            action: visualActions.setBackgroundResource(task.resource),
        };
    }
    return null;
}

function getTextGenerator(task: Task): TaskGenerator | null {
    if (isSetTextTask(task)) {
        return {
            action: visualActions.setText(task.text),
        };
    }
    return null;
}

function getResetGenerator(): TaskGenerator | null {
    return {
        action: visualActions.resetVisuals(),
    };
}

function isSetBackgroundTask(task: Task): task is VisualBackgroundTask {
    return typeof task.resource === 'string';
}

function isSetTextTask(task: Task): task is VisualTextTask {
    return typeof task.text === 'string';
}
