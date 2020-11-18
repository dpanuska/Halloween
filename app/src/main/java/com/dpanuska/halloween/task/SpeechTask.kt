package com.dpanuska.halloween.task

import android.util.Log
import com.dpanuska.halloween.service.SpeechService
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import java.util.*

/**
 * Factory to create Text To Speech based tasks.
 */
object SpeechTask {

    private val dispatcher = Dispatchers.Main
    const val TAG = "SpeechTask"

    // region Complex tasks
    /**
     * Create a task to change all TTS values and say some text.
     * Currently unused and no loader exists for this.
     */
    fun createSayTextTask(text: String, pitch: Float, speechRate: Float, suspend: Boolean = true): BaseTask {
        val tasks = arrayListOf<BaseTask>(
            createSetPitchTask(pitch),
            createSetSpeechRateTask(speechRate),
            createSayTextTask(text, suspend)
        )
        return TaskList(tasks, dispatcher,true)
    }
    // endregion

    // region Reset
    /**
     * Create a task to reset TTS options to default values
     */
    fun createResetDefaultsTask(): BaseTask {
        return BaseTask(resetDefaultsTaskBlock(), dispatcher)
    }

    /**
     * Create task block for reset TTS task
     */
    private fun resetDefaultsTaskBlock(): TaskBlock {
        return {
            Log.e(TAG, "Starting reset defaults task")
            resetDefaultsTaskBlockAsync()
        }
    }

    /**
     * Create async result for reset TTS task execution block
     */
    private fun resetDefaultsTaskBlockAsync(): Deferred<TaskResult> {
        SpeechService.resetDefaultValues()
        return TaskHelper.syncSuccessResultAsync()
    }
    // endregion

    // region Say Text
    /**
     * Create a task to say provided text with TTS
     */
    fun createSayTextTask(text: String, suspend: Boolean = true): BaseTask {
        return BaseTask(sayTextTaskBlock(text), dispatcher, suspend)
    }

    /**
     * Create task execution block for say text task
     */
    private fun sayTextTaskBlock(text: String): TaskBlock {
        return {
            Log.e(FileTask.TAG, "Starting Say Text task")
            sayTextTaskBlockAsync(text)
        }
    }

    /**
     * Create async result for say text execution block
     */
    private fun sayTextTaskBlockAsync(text: String): Deferred<TaskResult> {
        return SpeechService.sayTextAsync(text)
    }
    // endregion

    // region Pitch
    /**
     * Create task to set TTS pitch
     */
    fun createSetPitchTask(pitch: Float, suspend: Boolean = false): BaseTask {
        return BaseTask(setPitchTaskBlock(pitch), dispatcher,suspend)
    }

    /**
     * Create task execution block for set pitch task
     */
    private fun setPitchTaskBlock(pitch: Float): TaskBlock {
        return {
            Log.e(FileTask.TAG, "Starting Set Pitch task")
            setPitchTaskBlockAsync(pitch)
        }
    }

    /**
     * Create async result for set pitch task block
     */
    private fun setPitchTaskBlockAsync(pitch: Float): Deferred<TaskResult> {
        SpeechService.setPitch(pitch)
        return TaskHelper.syncSuccessResultAsync()
    }
    // endregion

    // region Speech Rate
    /**
     * Create task to set TTS speech rate
     */
    fun createSetSpeechRateTask(speechRate: Float, suspend: Boolean = false): BaseTask {
        return BaseTask(setSpeechRateTaskBlock(speechRate), dispatcher, suspend)
    }

    /**
     * Create task execution block for set rate task
     */
    private fun setSpeechRateTaskBlock(speechRate: Float): TaskBlock {
        return {
            Log.e(FileTask.TAG, "Starting Speech Rate task")
            setSpeechRateTaskBlockAsync(speechRate)
        }
    }

    /**
     * Create async result for set rate execution block
     */
    private fun setSpeechRateTaskBlockAsync(speechRate: Float): Deferred<TaskResult> {
        SpeechService.setSpeechRate(speechRate)
        return TaskHelper.syncSuccessResultAsync()
    }
    // endregion

    // region Locale
    /**
     * Create task to set TTS Locale
     */
    fun createSetLocaleTask(locale: Locale): BaseTask {
        return BaseTask(setLocaleTaskBlock(locale), dispatcher)
    }

    /**
     * Create task execution block for locale task
     */
    private fun setLocaleTaskBlock(locale: Locale): TaskBlock {
        return {
            Log.e(FileTask.TAG, "Starting Set Locale task")
            setLocaleTaskBlockAsync(locale)
        }
    }

    /**
     * Create async result to locale task execution block
     */
    private fun setLocaleTaskBlockAsync(locale: Locale): Deferred<TaskResult> {
        SpeechService.setLocale(locale)
        return TaskHelper.syncSuccessResultAsync()
    }
    // endregion

}
