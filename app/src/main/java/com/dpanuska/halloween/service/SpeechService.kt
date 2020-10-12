package com.dpanuska.halloween.service

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

class SpeechService : UtteranceProgressListener() {

    private var tts: TextToSpeech? = null
    private var defaultPitch = 1f
    private var defaultRate = 1f
    private var sayTextResults = HashMap<String, CompletableDeferred<TaskResult>>() // Could also try promise / deferred

    fun start(context: Context) {
        shutDown()

        tts = TextToSpeech(context, TextToSpeech.OnInitListener { status ->
            if (status != TextToSpeech.ERROR) {
                //if there is no error then set language
                tts!!.setOnUtteranceProgressListener(this)
                resetDefaultValues()
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

    fun resetDefaultValues() {
        setLocale(Locale.US)
        setPitch(defaultPitch)
        setSpeechRate(defaultRate)
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

    fun setSpeechRate(freq: Float): Boolean {
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
