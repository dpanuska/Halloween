package com.dpanuska.halloween.task.load

import com.dpanuska.halloween.task.BaseTask
import com.dpanuska.halloween.task.CameraTask
import org.json.JSONObject

class CameraTaskParser: TaskParser() {
    override val supportedTypes: ArrayList<String>
        get() = arrayListOf(
            CameraTaskType.TAKE_PICTURE.toString(),
        )

    override fun createFromJSON(
        taskJSON: JSONObject,
        suspend: Boolean,
        taskName: String?
    ): BaseTask? {
        val taskType = taskJSON.getString(TaskLoader.TYPE_KEY)

        val type = CameraTaskType.valueOf(taskType)
        val task = when(type) {
            CameraTaskType.TAKE_PICTURE -> CameraTask.createTakePhotoTask(suspend)
        }

        task?.taskName = taskName

        return task
    }

    enum class CameraTaskType{
        TAKE_PICTURE,
    }
}