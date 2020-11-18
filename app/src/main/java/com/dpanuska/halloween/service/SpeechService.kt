package com.dpanuska.halloween.service

import android.content.Context
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import com.dpanuska.halloween.task.TaskResult
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import java.util.*
import kotlin.collections.HashMap

/**
 * Service used to interact with text to speech
 */
object SpeechService : UtteranceProgressListener() {

    private var tts: TextToSpeech? = null
    private var defaultPitch = 1f
    private var defaultRate = 1f
    private var sayTextResults = HashMap<String, CompletableDeferred<TaskResult>>() // Could also try promise / deferred

    /**
     * Start the Service
     */
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

    /**
     * Shut down the service
     */
    fun shutDown() {
        if (tts != null) {
            tts!!.stop()
            tts!!.shutdown()
            tts = null
        }
    }

    /**
     * Reset TTS values to default
     */
    fun resetDefaultValues() {
        setLocale(Locale.US)
        setPitch(defaultPitch)
        setSpeechRate(defaultRate)
    }

    /**
     * Say something with TTS. Tracks the completion of execution in order to notify consumer
     * when TTS has completed saying the text
     */
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

    /**
     * Set TTS locale
     */
    fun setLocale(locale: Locale): Boolean {
        if (tts == null) {
            throw Exception("TextToSpeech not initialized")
        }

        val result = tts!!.setLanguage(locale)

        return result == TextToSpeech.LANG_AVAILABLE
    }

    /**
     * Set TTS pitch
     */
    fun setPitch(pitch: Float): Boolean {
        if (tts == null) {
            throw Exception("TextToSpeech not initialized")
        }

        val result = tts!!.setPitch(pitch)

        return result == TextToSpeech.SUCCESS
    }

    /**
     * Set TTS speech rate
     */
    fun setSpeechRate(freq: Float): Boolean {
        if (tts == null) {
            throw Exception("TextToSpeech not initialized")
        }

        val result = tts!!.setSpeechRate(freq)

        return result == TextToSpeech.SUCCESS
    }

    // UtteranceProgressListener

    /**
     * Callback when TTS speak starts
     */
    override fun onStart(utteranceId: String?) {}

    /**
     * Callback when TTS speak completes. Will complete deferred result
     */
    override fun onDone(utteranceId: String?) {
        utteranceId.let { id ->
            val result = sayTextResults[id]
            if (result != null) {
                sayTextResults.remove(id)
                result.complete(null)
            }
        }
    }

    /**
     * Callback for TTS speak error. Will complete deferred result with error
     */
    override fun onError(utteranceId: String?) {
        utteranceId.let { id ->
            val result = sayTextResults[id]
            if (result != null) {
                sayTextResults.remove(id)
                result.complete(Exception("Failed to say text"))
            }
        }
    }

}
