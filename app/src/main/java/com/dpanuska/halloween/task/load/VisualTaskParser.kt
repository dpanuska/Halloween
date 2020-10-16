package com.dpanuska.halloween.task.load

import com.dpanuska.halloween.R
import com.dpanuska.halloween.task.BaseTask
import com.dpanuska.halloween.task.VisualTask
import org.json.JSONObject

class VisualTaskParser: TaskParser() {

    val imageResourceMap = hashMapOf<String, Int>(
        "hal" to R.drawable.hal_9000,
        "anime" to R.drawable.anime
    )
    val gifResourceMap = hashMapOf<String, Int>(
        "hal" to R.raw.haleye,
        "hello_there" to R.raw.hello_there,
        "bye_kid" to R.raw.goodbye_kid,
        "static" to R.raw.static_anim,
        "dispenser" to R.raw.dispenser,
        "dispenser2" to R.raw.dispenser2,
        "horror" to R.raw.horror,
        "happy_house" to R.raw.happy_house,
        "happy_house2" to R.raw.happy_house2,
        "sorry_kevin" to R.raw.kevin_sorry,
        "sorry_patrick" to R.raw.patrick_sorry
    )

    override val supportedTypes: ArrayList<String>
        get() = ArrayList<String>(VisualTaskType.values().map { type -> type.toString() })

    override fun createFromJSON(
        taskJSON: JSONObject,
        suspend: Boolean,
        taskName: String?
    ): BaseTask? {
        val taskType = taskJSON.getString(TaskLoader.TYPE_KEY)

        val task = when(VisualTaskType.valueOf(taskType)) {
            VisualTaskType.VISUAL_BACKGROUND -> createDisplayBGFromJSON(taskJSON, suspend)
            VisualTaskType.VISUAL_BACKGROUND_CHAINED -> createChainedDisplayBGFromJSON(taskJSON, suspend)
            VisualTaskType.VISUAL_BACKGROUND_GIF -> createDisplayGifFromJSON(taskJSON, suspend)
            VisualTaskType.VISUAL_TEXT -> createShowTextFromJSON(taskJSON, suspend)
            VisualTaskType.VISUAL_RESET -> createResetFromJSON(taskJSON, suspend)
            else -> null
        }

        task?.taskName = taskName

        return task
    }

    private fun createDisplayBGFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask? {
        val resource = taskJSON.getString(RESOURCE_KEY)
        val resId = imageResourceMap[resource]
       if (resId != null) {
           return VisualTask.createSetBackgroundTask(resId)
       }

        return null
    }

    private fun createChainedDisplayBGFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask {
        return VisualTask.createSetBackgroundTask()
    }

    private fun createDisplayGifFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask? {
        val resource = taskJSON.getString(RESOURCE_KEY)
        val resId = gifResourceMap[resource]
        if (resId != null) {
            return VisualTask.createSetBackgroundGifTask(resId)
        }

        return null
    }

    private fun createShowTextFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask?{
        val text = taskJSON.getString(TEXT_KEY)
        return VisualTask.createSetTextTask(text)
    }

    private fun createResetFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask?{
        return VisualTask.createHideOverlayTask()
    }

    enum class VisualTaskType{
        VISUAL_BACKGROUND,
        VISUAL_BACKGROUND_CHAINED,
        VISUAL_BACKGROUND_GIF,
        VISUAL_TEXT,
        VISUAL_RESET,
    }

    companion object {
        private const val RESOURCE_KEY = "resource"
        private const val TEXT_KEY = "text"
    }

}