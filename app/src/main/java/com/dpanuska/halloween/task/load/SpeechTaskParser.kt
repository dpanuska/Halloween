package com.dpanuska.halloween.task.load

import com.dpanuska.halloween.task.BaseTask
import com.dpanuska.halloween.task.SpeechTask
import org.json.JSONObject
import java.util.*
import kotlin.collections.ArrayList


/**
 * Load Text to Speech related tasks. See supportedTypes for types loaded
 */
class SpeechTaskParser: TaskParser() {
    override val supportedTypes: ArrayList<String>
        get() = arrayListOf(
            SpeechTaskType.SPEECH_TEXT.toString(),
            SpeechTaskType.SPEECH_LOCALE.toString(),
            SpeechTaskType.SPEECH_PITCH.toString(),
            SpeechTaskType.SPEECH_RATE.toString(),
            SpeechTaskType.SPEECH_RESET.toString()
        )

    override fun createFromJSON(taskJSON: JSONObject, suspend: Boolean, taskName: String?): BaseTask? {
        val taskType = taskJSON.getString(TaskLoader.TYPE_KEY)

        val type = SpeechTaskType.valueOf(taskType)
        val task = when(type) {
            SpeechTaskType.SPEECH_TEXT -> createSayTextFromJSON(taskJSON, suspend)
            SpeechTaskType.SPEECH_LOCALE -> createSetLocaleFromJSON(taskJSON, suspend)
            SpeechTaskType.SPEECH_PITCH -> createSetPitchFromJSON(taskJSON, suspend)
            SpeechTaskType.SPEECH_RATE -> createSetRateFromJSON(taskJSON, suspend)
            SpeechTaskType.SPEECH_RESET -> createResetFromJSON(taskJSON, suspend)
            else -> null
        }

        task?.taskName = taskName

        return task
    }

    private fun createSayTextFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask {
        val text = taskJSON.getString(TEXT_KEY)
        return SpeechTask.createSayTextTask(text, suspend)
    }

    private  fun createSetLocaleFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask {
        val localeStr = taskJSON.getString(LOCALE_KEY)

        var locale = when(localeStr) {
            "UK" -> Locale.UK
            "Japan" -> Locale.JAPAN
            else -> Locale.US
        }
        return SpeechTask.createSetLocaleTask(locale)
    }

    private fun createSetPitchFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask {
        val pitch = taskJSON.getDouble(PITCH_KEY)
        return SpeechTask.createSetPitchTask(pitch.toFloat())
    }

    private fun createSetRateFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask {
        val rate = taskJSON.getDouble(RATE_KEY)
        return SpeechTask.createSetSpeechRateTask(rate.toFloat())
    }

    private fun createResetFromJSON(taskJSON: JSONObject, suspend: Boolean): BaseTask {
        return SpeechTask.createResetDefaultsTask()
    }

    companion object {
        private const val TEXT_KEY = "text"
        private const val LOCALE_KEY = "locale"
        private const val PITCH_KEY = "pitch"
        private const val RATE_KEY = "rate"
    }

    enum class SpeechTaskType {
        SPEECH_TEXT,
        SPEECH_LOCALE,
        SPEECH_PITCH,
        SPEECH_RATE,
        SPEECH_RESET,
    }
}