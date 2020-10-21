package com.dpanuska.halloween.service

import android.content.Context
import edu.cmu.pocketsphinx.*
import java.io.File

interface SpeechHandler {
    fun onPartialResults(result: String)
    fun onStartOfSpeech()
    fun onEndOfSpeech()
    fun onResults(result: String)
}



// TODO Start and End callback or action dispatch
object VoiceRecognitionService: RecognitionListener {

    enum class RecognitionType(val typeName: String) {
        MAIN("main"),
        CAMERA("camera")
    }

    private var recognizer: SpeechRecognizer? = null
    private var speechHandler: SpeechHandler? = null

    fun start(context: Context, handler: SpeechHandler) {

        speechHandler = handler
        val assets = Assets(context)
        val assetDir = assets.syncAssets()


        // The recognizer can be configured to perform multiple searches
        // of different kind and switch between them
        recognizer = SpeechRecognizerSetup.defaultSetup()
            .setAcousticModel(File(assetDir, "en-us-ptm"))
            .setDictionary(File(assetDir, "cmudict-en-us.dict"))
            .setKeywordThreshold(0.01f)
            .recognizer
        recognizer?.addListener(this)

        val menuGrammar: File = File(assetDir, "main.gram")
        recognizer?.addKeywordSearch(RecognitionType.MAIN.typeName, menuGrammar)

        val cameraGrammar: File = File(assetDir, "camera.gram")
        recognizer?.addKeywordSearch(RecognitionType.CAMERA.typeName, cameraGrammar)
    }

    fun shutDown() {
        recognizer?.cancel()
        recognizer?.shutdown()
        recognizer = null
    }

    fun stopListening() {
        recognizer?.stop()
    }

    fun setRecognitionType(type: RecognitionType) {
        recognizer?.stop()
        recognizer?.startListening(type.typeName)
    }

    override fun onBeginningOfSpeech() {
       //TODO("Not yet implemented")
    }

    override fun onEndOfSpeech() {
        //TODO("Not yet implemented")
    }

    override fun onPartialResult(hypothesis: Hypothesis?) {
        if (hypothesis != null) {
            val text = hypothesis.hypstr
            speechHandler?.onPartialResults(text)
        }
    }

    override fun onResult(hypothesis: Hypothesis?) {
        if (hypothesis != null) {
            val text = hypothesis.hypstr
            speechHandler?.onResults(text)
        }
    }

    override fun onError(e: Exception?) {
        //TODO("Not yet implemented")
    }

    override fun onTimeout() {
        //TODO("Not yet implemented")
    }

    // Something/callback should be able to create task in response
}