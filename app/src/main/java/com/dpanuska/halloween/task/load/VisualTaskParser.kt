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
    // Can probably be done automatically if using same names as resources
    val gifResourceMap = hashMapOf<String, Int>(
        "hal" to R.raw.haleye,
        "hello_there" to R.raw.hello_there,
        "hello_obi" to R.raw.hello_obi,
        "hello_princess" to R.raw.hello_princess,
        "hello_bean" to R.raw.hello_bean,
        "hello_woody" to R.raw.hello_woody,
        "hello_doubtfire" to R.raw.hello_doubtfire,
        "bye_kid" to R.raw.goodbye_kid,
        "bye_dumb" to R.raw.bye_dumb,
        "bye_solo" to R.raw.bye_solo,
        "static" to R.raw.static_anim,
        "dispenser" to R.raw.dispenser,
        "dispenser2" to R.raw.dispenser2,
        "horror" to R.raw.horror,
        "horror_walk" to R.raw.horror_walk,
        "happy_house" to R.raw.happy_house,
        "happy_house2" to R.raw.happy_house2,
        "pumpkin" to R.raw.pumpkin,
        "sorry_kevin" to R.raw.kevin_sorry,
        "sorry_patrick" to R.raw.patrick_sorry,
        "sorry_office" to R.raw.sorry_office,
        "grab_candy" to R.raw.grab_candy,
        "calculate" to R.raw.calculating,
        "confused_mark" to R.raw.confused_mark,
        "confused_travolta" to R.raw.confused_travolta,
        "confused_jack" to R.raw.confused_jack,
        "cena" to R.raw.cena,
        "donut" to R.raw.donut,
        "idle_space" to R.raw.idle_space,
        "idle_stars" to R.raw.idle_space_stars,
        "learn_space" to R.raw.learn_space,
        "next_year" to R.raw.next_year,
        "spider" to R.raw.spider,
        "dance" to R.raw.dance,
        "beats" to R.raw.beats,
        "jack" to R.raw.jack,
        "boo" to R.raw.boo,
        "touch_yoda" to R.raw.touch_yoda,
        "touch_crabs" to R.raw.touch_crabs,
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