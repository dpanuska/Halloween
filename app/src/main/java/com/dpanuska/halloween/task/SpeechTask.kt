package com.dpanuska.halloween.task

import com.dpanuska.halloween.service.speech.SpeechService
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import java.util.*


object SpeechTask {

    fun createSayTextTask(service: SpeechService, text: String, suspend: Boolean = false): BaseTask {
        return BaseTask(
            sayTextTaskBlock(service, text), suspend
        )
    }

    fun sayTextTaskBlock(service: SpeechService, text: String): TaskBlock {
        return {
            sayTextTaskBlockAsync(service, text)
        }
    }

    private fun sayTextTaskBlockAsync(service: SpeechService, text: String): Deferred<TaskResult> {
       return service.sayTextAsync(text)
    }

    fun setLocaleTaskBlock(service: SpeechService, locale: Locale): TaskBlock {
        return {
            setLocaleTaskBlockAsync(service, locale)
        }
    }

    private fun setLocaleTaskBlockAsync(service: SpeechService, locale: Locale): Deferred<TaskResult> {
        service.setLocale(locale)
        val result =  CompletableDeferred<TaskResult>()
        result.complete(Success(1))
        return result
    }

    fun setPitchTaskBlock(service: SpeechService, pitch: Float): TaskBlock {
        return {
            setPitchTaskBlockAsync(service, pitch)
        }
    }

    private fun setPitchTaskBlockAsync(service: SpeechService, pitch: Float): Deferred<TaskResult> {
        service.setPitch(pitch)
        val result =  CompletableDeferred<TaskResult>()
        result.complete(Success(1))
        return result
    }
}
