package com.dpanuska.halloween.task.load

import android.content.res.Resources
import com.dpanuska.halloween.task.BaseTask
import com.dpanuska.halloween.task.SpeechTask
import com.dpanuska.halloween.task.TaskList
import kotlinx.coroutines.Dispatchers
import org.json.JSONArray
import org.json.JSONObject
import kotlin.collections.ArrayList
import kotlin.collections.HashMap
import kotlin.random.Random


class TaskLoader {

    val taskTypeMap = HashMap<String, ArrayList<BaseTask>>()
    val taskNameMap = HashMap<String, BaseTask>()
    val parsers = HashMap<String, TaskParser>()

    init {
        registerTaskParser(SpeechTaskParser())
        registerTaskParser(VisualTaskParser())
        registerTaskParser(GenericTaskParser())
        registerTaskParser(CameraTaskParser())
        registerTaskParser(FileTaskParser())
        registerTaskParser(NamedTaskParser())
    }

    fun getRandomTaskOfType(type: String): BaseTask? {
        val tasks = taskTypeMap[type]
        if (tasks != null) {
            val rand = Random.nextInt(0, tasks.size)
            return tasks[rand]?.clone() as BaseTask?
        }

        return null
    }

    fun getTaskByName(name: String): BaseTask? {
        return taskNameMap[name]?.clone() as BaseTask?
    }

    fun getAllTasks(): Collection<BaseTask> {
        val result = ArrayList<BaseTask>()
        val allTypes = taskTypeMap.values

        for (type in allTypes) {
            for (task in type) {
                result.add(task.clone() as BaseTask)
            }
        }

        return result
    }

    private fun registerTaskParser(parser: TaskParser) {
        for (type in parser.supportedTypes) {
            parsers[type] = parser
        }
    }

    fun loadFromJSONResource(resources: Resources, resId: Int) {

        val text = resources.openRawResource(resId).bufferedReader().use {
            it.readText()
        }
        val json = JSONObject(text)

        val definitions = json.getJSONArray(TASK_DEFINITIONS_KEY)
        for (index in 0 until definitions.length()) {
            val taskJSON = definitions.getJSONObject(index)

            val type = taskJSON.getString(TYPE_KEY)
            var name: String? = null
            if (taskJSON.has(NAME_KEY)) {
                name = taskJSON.getString(NAME_KEY)
            }
            var suspend = false
            if (taskJSON.has(SUSPEND_KEY)) {
                suspend = taskJSON.getBoolean(SUSPEND_KEY)
            }

            val subTasks = taskJSON.getJSONArray(SUB_TASKS_KEY)
            val taskList = createTaskListFromSubTaskJSON(subTasks, suspend, name)

            addTaskOfType(type, taskList)
        }
    }

    private fun addTaskOfType(type: String, task: BaseTask) {
        var list = taskTypeMap[type]
        if (list == null) {
            list = ArrayList<BaseTask>()
            taskTypeMap[type] = list
        }
        list.add(task)

        if (task.taskName != null) {
            taskNameMap[task.taskName!!] = task
        }
    }

    private fun createTaskListFromSubTaskJSON(subTasksJSON: JSONArray, suspend: Boolean, taskName: String?): TaskList {
        val subTaskList = ArrayList<BaseTask>()

        // Sub tasks
        for(subIndex in 0 until subTasksJSON.length()) {
            val subJSON = subTasksJSON.getJSONObject(subIndex)

            val taskType = subJSON.getString(TYPE_KEY)
            var subName: String? = null
            if (subJSON.has(NAME_KEY)) {
                subName = subJSON.getString(NAME_KEY)
            }
            var subSuspend = false
            if (subJSON.has(SUSPEND_KEY)) {
                subSuspend = subJSON.getBoolean(SUSPEND_KEY)
            }

            val parser = parsers[taskType]
            if (parser != null) {
                val task = parser.createFromJSON(subJSON, subSuspend, subName)
                if (task != null) {
                    subTaskList.add(task)
                }
            }
        }

       return TaskList(subTaskList, Dispatchers.Default, suspend, taskName)
    }

    companion object {
        const val TASK_DEFINITIONS_KEY = "taskDefinitions"
        const val TYPE_KEY = "type"
        const val TASK_TYPE_KEY = "taskType"
        const val SUB_TASKS_KEY = "subTasks"
        const val SUSPEND_KEY = "suspend"
        const val NAME_KEY = "name"
    }

    enum class NamedTaskType {
        NAMED,
        TYPED
    }

    inner class NamedTaskParser: TaskParser() {
        override val supportedTypes: ArrayList<String>
            get() = arrayListOf(
                NamedTaskType.NAMED.toString(),
                NamedTaskType.TYPED.toString()
            )

        override fun createFromJSON(
            taskJSON: JSONObject,
            suspend: Boolean,
            taskName: String?
        ): BaseTask? {
            val taskType = taskJSON.getString(TYPE_KEY)

            val type = NamedTaskType.valueOf(taskType)
            val task = when(type) {
                NamedTaskType.NAMED -> createNamedFromJSON(taskJSON, suspend)
                NamedTaskType.TYPED -> createTypedFromJSON(taskJSON, suspend)
            }

            task?.taskName = taskName

            return task
        }

        private fun createNamedFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask {
            val name = taskJSON.getString(NAME_KEY)
            return NamedTask(name, suspend)
        }

        private fun createTypedFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask {
            val type = taskJSON.getString(TASK_TYPE_KEY)
            return TypeTask(type, suspend)
        }
    }

    inner class NamedTask(name: String, suspend: Boolean = false): BaseTask(null, Dispatchers.Default, suspend, null) {
        override fun clone(): Any {
            val task = getTaskByName(taskName!!) as BaseTask
            task.waitForCompletion = waitForCompletion
            return task
        }
    }

    inner class TypeTask(type: String, suspend: Boolean = false): BaseTask(null, Dispatchers.Default, suspend, null) {
        val taskType = type

        override fun clone(): Any {
            val task = getRandomTaskOfType(taskType) as BaseTask
            task.waitForCompletion = waitForCompletion
            return task
        }
    }
}

// Task in groups -> Greeting, blah blah
// Reference tasks from other tasks

// Need base task definitions - one file per type - merge results in code to generate complex tasks

// Task list definitions after base tasks read - create complex tasks
// separate task lists by usage ie greetings.json, camera.json
// sub tasks can be lists
// create overall way to loop all files in order needed


// TODO TASKS SHOULD BE ABLE TO PASS RESULTS!!!