package com.dpanuska.halloween.task.load

import com.dpanuska.halloween.task.BaseTask
import com.dpanuska.halloween.task.FileTask
import org.json.JSONObject


class FileTaskParser: TaskParser() {
    override val supportedTypes: ArrayList<String>
        get() = arrayListOf(
            FileTaskType.SAVE_PICTURE.toString(),
        )

    override fun createFromJSON(
        taskJSON: JSONObject,
        suspend: Boolean,
        taskName: String?
    ): BaseTask? {
        val taskType = taskJSON.getString(TaskLoader.TYPE_KEY)

        val type = FileTaskType.valueOf(taskType)
        val task = when(type) {
            FileTaskType.SAVE_PICTURE -> FileTask.createSaveImageTask(suspend)
        }

        task?.taskName = taskName

        return task
    }


    enum class FileTaskType{
        SAVE_PICTURE,
    }
}