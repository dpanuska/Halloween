package com.dpanuska.halloween.task

import com.dpanuska.halloween.service.speech.SpeechService
import kotlinx.coroutines.Deferred
import java.util.*


object SpeechTask {

    // Complex
    fun createSayTextTask(service: SpeechService, text: String, pitch: Float, speechRate: Float, suspend: Boolean = true): BaseTask {
        val tasks = arrayListOf<BaseTask>(
            createSetPitchTask(service, pitch),
            createSetSpeechRateTask(service, speechRate),
            createSayTextTask(service, text, suspend)
        )
        return TaskList(tasks, true)
    }

    // Factory
    fun createResetDefaultsTask(service: SpeechService): BaseTask {
        return BaseTask(
            resetDefaultsTaskBlock(service)
        )
    }

    fun createSayTextTask(service: SpeechService, text: String, suspend: Boolean = true): BaseTask {
        return BaseTask(
            sayTextTaskBlock(service, text), suspend
        )
    }

    fun createSetPitchTask(service: SpeechService, pitch: Float): BaseTask {
        return BaseTask(
            setPitchTaskBlock(service, pitch), false
        )
    }

    fun createSetSpeechRateTask(service: SpeechService, speechRate: Float): BaseTask {
        return BaseTask(
            setSpeechRateTaskBlock(service, speechRate), false
        )
    }

    fun createSetLocaleTask(service: SpeechService, locale: Locale): BaseTask {
        return BaseTask(
            setLocaleTaskBlock(service, locale)
        )
    }

    // Reset
    fun resetDefaultsTaskBlock(service: SpeechService): TaskBlock {
        return {
            resetDefaultsTaskBlockAsync(service)
        }
    }

    private fun resetDefaultsTaskBlockAsync(service: SpeechService): Deferred<TaskResult> {
        service.resetDefaultValues()
        return TaskHelper.syncSuccessResultAsync()
    }

    // Say Text
    fun sayTextTaskBlock(service: SpeechService, text: String): TaskBlock {
        return {
            sayTextTaskBlockAsync(service, text)
        }
    }

    private fun sayTextTaskBlockAsync(service: SpeechService, text: String): Deferred<TaskResult> {
       return service.sayTextAsync(text)
    }


    // Locale
    fun setLocaleTaskBlock(service: SpeechService, locale: Locale): TaskBlock {
        return {
            setLocaleTaskBlockAsync(service, locale)
        }
    }

    private fun setLocaleTaskBlockAsync(service: SpeechService, locale: Locale): Deferred<TaskResult> {
        service.setLocale(locale)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Pitch
    fun setPitchTaskBlock(service: SpeechService, pitch: Float): TaskBlock {
        return {
            setPitchTaskBlockAsync(service, pitch)
        }
    }

    private fun setPitchTaskBlockAsync(service: SpeechService, pitch: Float): Deferred<TaskResult> {
        service.setPitch(pitch)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Speech Rate
    fun setSpeechRateTaskBlock(service: SpeechService, speechRate: Float): TaskBlock {
        return {
            setSpeechRateTaskBlockAsync(service, speechRate)
        }
    }

    private fun setSpeechRateTaskBlockAsync(service: SpeechService, speechRate: Float): Deferred<TaskResult> {
        service.setSpeechRate(speechRate)
        return TaskHelper.syncSuccessResultAsync()
    }

}
