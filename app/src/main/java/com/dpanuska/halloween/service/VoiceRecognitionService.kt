package com.dpanuska.halloween.service

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import java.util.*

interface SpeechHandler {
    fun onPartialResults(results: ArrayList<String>)
    fun onStartOfSpeech()
    fun onEndOfSpeech()
    fun onResults(results: ArrayList<String>)
}


// TODO Start and End callback or action dispatch
object VoiceRecognitionService {

    private var speechRecognizer: SpeechRecognizer? = null

    fun start(context: Context, handler: SpeechHandler) {
       shutDown()
        // TODO error checks
        val avail = SpeechRecognizer.isRecognitionAvailable(context)
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(context)

        val speechRecognizerIntent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
        speechRecognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
        speechRecognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
        //Specify the calling package to identify your application
        speechRecognizerIntent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, this.javaClass.getPackage().getName());

        //specify the max number of results
        speechRecognizerIntent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS,5);
        speechRecognizerIntent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)

        speechRecognizer!!.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(bundle: Bundle) {}
            override fun onBeginningOfSpeech() {
                handler.onStartOfSpeech()
//                editText.setText("")
//                editText.setHint("Listening...")
            }

            override fun onRmsChanged(v: Float) {}
            override fun onBufferReceived(bytes: ByteArray) {}
            override fun onEndOfSpeech() {
                handler.onEndOfSpeech()
            }
            override fun onError(i: Int) {}
            override fun onResults(bundle: Bundle) {
                bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)?.let {
                    handler.onResults(
                        it
                    )
                }
//                micButton.setImageResource(R.drawable.ic_mic_black_off)
//                val data = bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
//                editText.setText(data!![0])
            }

            override fun onPartialResults(bundle: Bundle) {
                bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)?.let {
                    handler.onPartialResults(
                        it
                    )
                }
            }
            override fun onEvent(i: Int, bundle: Bundle) {}
        })

        speechRecognizer!!.startListening(speechRecognizerIntent)

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