import {BaseTask, TaskJson} from '../types/TaskTypes';
import taskJson from 'res/tasks';
import taskConfig from 'res/taskConfig';
import {TaskConfig} from '../types/StateTypes';

export async function fetchTasks(): Promise<BaseTask[]> {
    let allTasks = loadTasksFromJson(taskJson.base)
        .concat(loadTasksFromJson(taskJson.intro))
        .concat(loadTasksFromJson(taskJson.bye))
        .concat(loadTasksFromJson(taskJson.idle))
        .concat(loadTasksFromJson(taskJson.camera))
        .concat(loadTasksFromJson(taskJson.greeting));
    return allTasks;
}

export async function fetchConfiguration(): Promise<TaskConfig> {
    return taskConfig;
}

function loadTasksFromJson(jsonObj: TaskJson): BaseTask[] {
    let tasks = Array<BaseTask>();
    for (var def of jsonObj.taskDefinitions) {
        tasks.push(def);
    }
    return tasks;
}
