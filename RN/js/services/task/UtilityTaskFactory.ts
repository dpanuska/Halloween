import {delayTask} from 'src/redux/sagas/UtilitySagas';
import {delay} from 'src/redux/actions/UtilityActions';
import * as taskActions from 'src/redux/actions/TaskActions';
import {runNamedTask, runTypedTask} from 'src/redux/sagas/TaskSagas';

import {TaskGenerator, TaskGeneratorMap} from 'types/TaskFactoryTypes';
import {DelayTask, NamedTask, Task, TypedTask} from 'types/TaskTypes';

const UtilityTasks = {
    Delay: 'DELAY',
    Named: 'NAMED',
    Typed: 'TYPED',
};

// TODO Need to initialize supported typed to avoid circular dependancies!
// TaskSagas uses factory, and import TasSaga here = circular.
// Need to initialize these in a HOC instead of handling it like this.
export const FactoryForTypes: TaskGeneratorMap = {
    [UtilityTasks.Delay]: getDelayGenerator,
    [UtilityTasks.Named]: getNamedGenerator,
    [UtilityTasks.Typed]: getTypedGenerator,
};

function getDelayGenerator(task: Task): TaskGenerator | null {
    if (isDelayTask(task)) {
        return {
            generator: delayTask,
            action: delay(task.duration),
        };
    }
    return null;
}

function getNamedGenerator(task: Task): TaskGenerator | null {
    if (isNamedTask(task)) {
        return {
            generator: runNamedTask,
            action: taskActions.dispatchNamedTask(task.name),
        };
    }
    return null;
}

function getTypedGenerator(task: Task): TaskGenerator | null {
    if (isTypedTask(task)) {
        return {
            generator: runTypedTask,
            action: taskActions.dispatchTypedTask(task.taskType),
        };
    }
    return null;
}

function isDelayTask(task: Task): task is DelayTask {
    return typeof task.duration === 'number';
}

function isNamedTask(task: Task): task is NamedTask {
    return typeof task.name === 'string';
}

function isTypedTask(task: Task): task is TypedTask {
    return typeof task.taskType === 'string';
}
