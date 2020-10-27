package com.dpanuska.halloween.task.load

import com.dpanuska.halloween.service.VoiceRecognitionService
import com.dpanuska.halloween.task.BaseTask
import com.dpanuska.halloween.task.VoiceTask
import org.json.JSONObject

class VoiceTaskParser: TaskParser() {
    override val supportedTypes: ArrayList<String>
        get() = arrayListOf(
            VoiceTaskType.SET_RECOGNITION.toString(),
            VoiceTaskType.STOP_RECOGNITION.toString()
        )

    override fun createFromJSON(
        taskJSON: JSONObject,
        suspend: Boolean,
        taskName: String?
    ): BaseTask? {
        val taskType = taskJSON.getString(TaskLoader.TYPE_KEY)

        val type = VoiceTaskType.valueOf(taskType)
        val task = when(type) {
            VoiceTaskType.SET_RECOGNITION -> createSetRecognitionJSON(taskJSON)
            VoiceTaskType.STOP_RECOGNITION -> VoiceTask.createStopRecognitionTask()
        }

        task?.taskName = taskName

        return task
    }

    private fun createSetRecognitionJSON(taskJSON: JSONObject): BaseTask {
        val type = taskJSON.getString(RECOGNITION_TYPE)
        return VoiceTask.createSetRecognitionTask(VoiceRecognitionService.RecognitionType.valueOf(type))
    }

    enum class VoiceTaskType{
        SET_RECOGNITION,
        STOP_RECOGNITION
    }

    companion object {
        private const val RECOGNITION_TYPE = "recognition"
    }
}