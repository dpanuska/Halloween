package com.dpanuska.halloween.service.speech

import android.content.Context
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import java.util.*
import kotlin.collections.HashMap

enum class TaskProgress {
    QUEUED,
    STARTED,
    COMPLETED,
    FAILED,
}

class SpeechService : UtteranceProgressListener() {

    private var tts: TextToSpeech? = null
    private var tasks = HashMap<String, TaskProgress>()

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

    fun sayText(text: String): String {
        if (tts == null) {
            throw Exception("TextToSpeech not initialized")
        }

        val uuid = UUID.randomUUID().toString()
        tasks[uuid] = TaskProgress.QUEUED
        tts!!.speak(text, TextToSpeech.QUEUE_FLUSH, null, uuid)

        return uuid
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
        if (utteranceId != null) {
            tasks[utteranceId] = TaskProgress.STARTED
        }
    }

    override fun onDone(utteranceId: String?) {
        if (utteranceId != null) {
            tasks[utteranceId] = TaskProgress.COMPLETED
        }
    }

    override fun onError(utteranceId: String?) {
        if (utteranceId != null) {
            tasks[utteranceId] = TaskProgress.FAILED
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

 */