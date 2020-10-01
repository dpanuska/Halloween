package com.dpanuska.halloween.service.voice

import android.R
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import java.util.*

// TODO Start and End callback or action dispatch
class VoiceRecognitionService {

    private var speechRecognizer: SpeechRecognizer? = null

    fun start(context: Context) {
        if (speechRecognizer != null) {
            shutDown()
        }

        val speechRecognizerIntent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
        speechRecognizerIntent.putExtra(
            RecognizerIntent.EXTRA_LANGUAGE_MODEL,
            RecognizerIntent.LANGUAGE_MODEL_FREE_FORM
        )
        speechRecognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())

        // TODO error checks
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(context)
        speechRecognizer!!.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(bundle: Bundle) {}
            override fun onBeginningOfSpeech() {
//                editText.setText("")
//                editText.setHint("Listening...")
            }

            override fun onRmsChanged(v: Float) {}
            override fun onBufferReceived(bytes: ByteArray) {}
            override fun onEndOfSpeech() {}
            override fun onError(i: Int) {}
            override fun onResults(bundle: Bundle) {
//                micButton.setImageResource(R.drawable.ic_mic_black_off)
//                val data = bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
//                editText.setText(data!![0])
            }

            override fun onPartialResults(bundle: Bundle) {}
            override fun onEvent(i: Int, bundle: Bundle) {}
        })

    }

    fun shutDown() {
        if (speechRecognizer != null) {
            speechRecognizer!!.stopListening()
            speechRecognizer!!.destroy()
            speechRecognizer = null
        }
    }

    // Something/callback should be able to create task in response
}