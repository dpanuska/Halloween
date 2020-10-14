package com.dpanuska.halloween.task

import android.util.Log
import com.dpanuska.halloween.service.SpeechService
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import java.util.*

object SpeechTask {

    val dispatcher = Dispatchers.Main
    const val TAG = "SpeechTask"

    // Complex
    fun createSayTextTask(text: String, pitch: Float, speechRate: Float, suspend: Boolean = true): BaseTask {
        val tasks = arrayListOf<BaseTask>(
            createSetPitchTask(pitch),
            createSetSpeechRateTask(speechRate),
            createSayTextTask(text, suspend)
        )
        return TaskList(tasks, dispatcher,true)
    }

    // Factory
    fun createResetDefaultsTask(): BaseTask {
        return BaseTask(resetDefaultsTaskBlock(), dispatcher)
    }

    fun createSayTextTask(text: String, suspend: Boolean = true): BaseTask {
        return BaseTask(sayTextTaskBlock(text), dispatcher, suspend)
    }

    fun createSetPitchTask(pitch: Float): BaseTask {
        return BaseTask(setPitchTaskBlock(pitch), dispatcher,false)
    }

    fun createSetSpeechRateTask(speechRate: Float): BaseTask {
        return BaseTask(setSpeechRateTaskBlock(speechRate), dispatcher,false)
    }

    fun createSetLocaleTask(locale: Locale): BaseTask {
        return BaseTask(setLocaleTaskBlock(locale), dispatcher)
    }

    // Reset
    fun resetDefaultsTaskBlock(): TaskBlock {
        return {
            Log.e(TAG, "Starting reset defaults task")
            resetDefaultsTaskBlockAsync()
        }
    }

    private fun resetDefaultsTaskBlockAsync(): Deferred<TaskResult> {
        SpeechService.resetDefaultValues()
        return TaskHelper.syncSuccessResultAsync()
    }

    // Say Text
    fun sayTextTaskBlock(text: String): TaskBlock {
        return {
            Log.e(FileTask.TAG, "Starting Say Text task")
            sayTextTaskBlockAsync(text)
        }
    }

    private fun sayTextTaskBlockAsync(text: String): Deferred<TaskResult> {
       return SpeechService.sayTextAsync(text)
    }


    // Locale
    fun setLocaleTaskBlock(locale: Locale): TaskBlock {
        return {
            Log.e(FileTask.TAG, "Starting Set Locale task")
            setLocaleTaskBlockAsync(locale)
        }
    }

    private fun setLocaleTaskBlockAsync(locale: Locale): Deferred<TaskResult> {
        SpeechService.setLocale(locale)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Pitch
    fun setPitchTaskBlock(pitch: Float): TaskBlock {
        return {
            Log.e(FileTask.TAG, "Starting Set Pitch task")
            setPitchTaskBlockAsync(pitch)
        }
    }

    private fun setPitchTaskBlockAsync(pitch: Float): Deferred<TaskResult> {
        SpeechService.setPitch(pitch)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Speech Rate
    fun setSpeechRateTaskBlock(speechRate: Float): TaskBlock {
        return {
            Log.e(FileTask.TAG, "Starting Speech Rate task")
            setSpeechRateTaskBlockAsync(speechRate)
        }
    }

    private fun setSpeechRateTaskBlockAsync(speechRate: Float): Deferred<TaskResult> {
        SpeechService.setSpeechRate(speechRate)
        return TaskHelper.syncSuccessResultAsync()
    }

}
