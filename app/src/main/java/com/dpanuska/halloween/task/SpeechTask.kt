package com.dpanuska.halloween.task

import com.dpanuska.halloween.service.SpeechService
import kotlinx.coroutines.Deferred
import java.util.*

object SpeechTask {

    // Complex
    fun createSayTextTask(text: String, pitch: Float, speechRate: Float, suspend: Boolean = true): BaseTask {
        val tasks = arrayListOf<BaseTask>(
            createSetPitchTask(pitch),
            createSetSpeechRateTask(speechRate),
            createSayTextTask(text, suspend)
        )
        return TaskList(tasks, true)
    }

    // Factory
    fun createResetDefaultsTask(): BaseTask {
        return BaseTask(
            resetDefaultsTaskBlock()
        )
    }

    fun createSayTextTask(text: String, suspend: Boolean = true): BaseTask {
        return BaseTask(
            sayTextTaskBlock(text), suspend
        )
    }

    fun createSetPitchTask(pitch: Float): BaseTask {
        return BaseTask(
            setPitchTaskBlock(pitch), false
        )
    }

    fun createSetSpeechRateTask(speechRate: Float): BaseTask {
        return BaseTask(
            setSpeechRateTaskBlock(speechRate), false
        )
    }

    fun createSetLocaleTask(locale: Locale): BaseTask {
        return BaseTask(
            setLocaleTaskBlock(locale)
        )
    }

    // Reset
    fun resetDefaultsTaskBlock(): TaskBlock {
        return {
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
            sayTextTaskBlockAsync(text)
        }
    }

    private fun sayTextTaskBlockAsync(text: String): Deferred<TaskResult> {
       return SpeechService.sayTextAsync(text)
    }


    // Locale
    fun setLocaleTaskBlock(locale: Locale): TaskBlock {
        return {
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
            setSpeechRateTaskBlockAsync(speechRate)
        }
    }

    private fun setSpeechRateTaskBlockAsync(speechRate: Float): Deferred<TaskResult> {
        SpeechService.setSpeechRate(speechRate)
        return TaskHelper.syncSuccessResultAsync()
    }

}
