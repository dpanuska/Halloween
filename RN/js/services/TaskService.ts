import json from 'res/tasks';
import taskConfig from 'res/taskConfig';

import {TaskConfig} from 'types/StateTypes';
import {TaskList, TaskJson} from 'types/TaskTypes';

export async function fetchTasks(): Promise<TaskList[]> {
    let allTasks = loadTasksFromJson(json.base)
        .concat(loadTasksFromJson(json.intro))
        .concat(loadTasksFromJson(json.bye))
        .concat(loadTasksFromJson(json.idle))
        .concat(loadTasksFromJson(json.camera))
        .concat(loadTasksFromJson(json.greeting));
    return allTasks;
}

export async function fetchConfiguration(): Promise<TaskConfig> {
    return taskConfig;
}

function loadTasksFromJson(jsonObj: TaskJson): TaskList[] {
    let tasks: TaskList[] = [];
    for (var def of jsonObj.taskDefinitions) {
        tasks.push(def);
    }
    return tasks;
}
