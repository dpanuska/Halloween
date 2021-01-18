import {
    TaskGenerator,
    TaskGeneratorFunction,
    TaskGeneratorMap,
} from 'src/types/TaskFactoryTypes';
import {Task, TaskResult} from 'src/types/TaskTypes';

const taskTypeGeneratorMap = new Map<string, TaskGeneratorFunction>();

export function registerTaskGenerator(generator: TaskGeneratorMap) {
    for (let [key, value] of Object.entries(generator)) {
        taskTypeGeneratorMap.set(key, value);
    }
}

export function getGeneratorForTask(
    task: Task,
    previousResult?: TaskResult,
): TaskGenerator | null {
    let factory = taskTypeGeneratorMap.get(task.type);
    if (factory != null) {
        return factory(task, previousResult);
    }
    return null;
}
