package com.dpanuska.halloween.task.load

import com.dpanuska.halloween.task.BaseTask
import com.dpanuska.halloween.task.TaskHelper
import org.json.JSONObject

/**
 * Load generic tasks. See supportedTypes for types loaded. Includes types such as delay.
 */
class GenericTaskParser: TaskParser() {
    override val supportedTypes: ArrayList<String>
        get() = ArrayList<String>(GeneralTaskType.values().map { type -> type.toString() })

    override fun createFromJSON(
        taskJSON: JSONObject,
        suspend: Boolean,
        taskName: String?
    ): BaseTask? {
        val taskType = taskJSON.getString(TaskLoader.TYPE_KEY)

        val type = GeneralTaskType.valueOf(taskType)
        val task = when(type) {
            GeneralTaskType.DELAY -> createDelayFromJSON(taskJSON, suspend)
            else -> null
        }

        task?.taskName = taskName

        return task
    }

    private fun createDelayFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask {
        val delay = taskJSON.getDouble(DURATION_KEY) * 1000 // seconds to milliseconds
        return TaskHelper.createDelayTask(delay.toLong())
    }

    companion object {
        private const val DURATION_KEY = "duration"
    }

    enum class GeneralTaskType{
        DELAY,
    }
}