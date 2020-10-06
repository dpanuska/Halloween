package com.dpanuska.halloween.service.speech

import android.content.Context
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import com.dpanuska.halloween.task.Failure
import com.dpanuska.halloween.task.Success
import com.dpanuska.halloween.task.TaskResult
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import java.util.*
import kotlin.collections.HashMap

enum class TaskProgress {
    QUEUED,
    STARTED,
    COMPLETED,
    FAILED,
}

typealias CompletionHandler = (TaskResult) -> Nothing

class SpeechService : UtteranceProgressListener() {

    private var tts: TextToSpeech? = null
    private var sayTextResults = HashMap<String, CompletableDeferred<TaskResult>>() // Could also try promise / deferred

    fun start(context: Context) {
        shutDown()
        tts = TextToSpeech(context, TextToSpeech.OnInitListener { status ->
            if (status != TextToSpeech.ERROR) {
                //if there is no error then set language
                tts!!.language = Locale.US
                tts!!.setOnUtteranceProgressListener(this)
            }
        })
    }

    fun shutDown() {
        if (tts != null) {
            tts!!.stop()
            tts!!.shutdown()
            tts = null
        }
    }

    fun sayTextAsync(text: String): Deferred<TaskResult> {
        if (tts == null) {
            throw Exception("TextToSpeech not initialized")
        }

        val uuid = UUID.randomUUID().toString()
        val result = CompletableDeferred<TaskResult>()
        sayTextResults[uuid] = result
        tts!!.speak(text, TextToSpeech.QUEUE_FLUSH, null, uuid)

        return result
    }

    fun setLocale(locale: Locale): Boolean {
        if (tts == null) {
            throw Exception("TextToSpeech not initialized")
        }

        val result = tts!!.setLanguage(locale)

        return result == TextToSpeech.LANG_AVAILABLE
    }

    fun setPitch(pitch: Float): Boolean {
        if (tts == null) {
            throw Exception("TextToSpeech not initialized")
        }

        val result = tts!!.setPitch(pitch)

        return result == TextToSpeech.SUCCESS
    }

    fun setFrequency(freq: Float): Boolean {
        if (tts == null) {
            throw Exception("TextToSpeech not initialized")
        }

        val result = tts!!.setSpeechRate(freq)

        return result == TextToSpeech.SUCCESS
    }

    // UtteranceProgressListener

    override fun onStart(utteranceId: String?) {

    }

    override fun onDone(utteranceId: String?) {
        utteranceId.let { id ->
            val result = sayTextResults[id]
            if (result != null) {
                sayTextResults.remove(id)
                result.complete(Success(1))
            }
        }
    }

    override fun onError(utteranceId: String?) {
        utteranceId.let { id ->
            val result = sayTextResults[id]
            if (result != null) {
                sayTextResults.remove(id)
                result.complete(Failure(Exception("Failed to say text")))
            }
        }
    }

}


// TASK
/*
Completion listener - success - failure
task list - wait for previous option

UUID
Type (TTS, Print, Image, etc)

TaskFactory - Create task of type

Task Queue - add tasks and execute
global completion handler

tasks[]
for (task in tasks) {
result = async { task.doWork() }
}


 */