import {BaseTask, TaskJson} from '../types/TaskTypes';
import taskJson from 'res/tasks';

export default class TaskService {
    private taskTypeMap = new Map<string, Array<BaseTask>>();
    private taskNameMap = new Map<string, BaseTask>();

    loadTasks() {
        // if there is invalid formatting in json from require()
        // it will have already caused an exception
        this.loadTasksFromJson(taskJson.base);
        this.loadTasksFromJson(taskJson.intro);
        this.loadTasksFromJson(taskJson.bye);
        this.loadTasksFromJson(taskJson.idle);
        this.loadTasksFromJson(taskJson.camera);
        this.loadTasksFromJson(taskJson.greeting);
    }

    loadTasksFromJson(jsonObj: TaskJson) {
        for (var def of jsonObj.taskDefinitions) {
            let {name, type} = def;
            var list = this.taskTypeMap.get(type);
            if (list == null) {
                // eslint-disable-next-line no-array-constructor
                list = new Array<BaseTask>();
                this.taskTypeMap.set(type, list);
            }
            list.push(def);
            if (name != null) {
                this.taskNameMap.set(name, def);
            }
        }
    }

    getTasksOfType(type: string): BaseTask[] | undefined {
        return this.taskTypeMap.get(type);
    }

    getRandomTaskOfType(type: string): BaseTask | undefined {
        let tasks = this.getTasksOfType(type);
        if (tasks == null) {
            return undefined;
        }
        let rand = Math.floor(Math.random() * tasks.length);
        return tasks[rand];
    }

    getTaskByName(name: string): BaseTask | undefined {
        return this.taskNameMap.get(name);
    }

    // getAllTasks(): BaseTask[] {}
}
