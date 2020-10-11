package com.dpanuska.halloween

import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.dpanuska.halloween.permissions.PermissionHelper
import com.dpanuska.halloween.service.camera.CameraService
import com.dpanuska.halloween.service.file.FileService
import com.dpanuska.halloween.service.print.PrintService
import com.dpanuska.halloween.service.speech.SpeechService
import com.dpanuska.halloween.service.voice.SpeechHandler
import com.dpanuska.halloween.service.voice.VoiceRecognitionService
import com.dpanuska.halloween.task.*
import com.mazenrashed.printooth.ui.ScanningActivity
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.launch
import java.io.File
import java.util.*

enum class AppState {
    IDLE,
    ACTIVE
}

class MainActivity : AppCompatActivity(), SpeechHandler, LuminosityCallbackHandler {

    var printService: PrintService = PrintService()
    var speechService: SpeechService = SpeechService()
    var voiceService = VoiceRecognitionService()
    var cameraService = CameraService()
    var fileService = FileService()
    var luminosityListener = LuminosityListener(this)
    var scheduler = TaskScheduler()

    var currentState = AppState.IDLE


    // CAMERA
    private lateinit var outputDirectory: File

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        PermissionHelper.checkAllPermissions(this)

        // CAMERA
        outputDirectory = getOutputDirectory()

        printService.start(this)
        speechService.start(this)
        voiceService.start(applicationContext, this)
        fileService.start(this)

        cameraService.start(this, this, viewFinder.createSurfaceProvider(), luminosityListener.analyzer)

        // TODO check if bluetooth supported
        //startActivityForResult(Intent(this, ScanningActivity::class.java), ScanningActivity.SCANNING_FOR_PRINTER)

        val button = findViewById<Button>(R.id.button)
        button?.setOnClickListener() {

            lifecycleScope.launch {
                val result = cameraService.takePhotoAsync()
                val bitmap = result.await()
                
                scheduler.queueTask(FileTask.createSaveImageTask(fileService, bitmap, outputDirectory))
            }


            //            val tasks = arrayListOf<BaseTask>(
//                SpeechTask.createSayTextTask(speechService, "3"),
//                SpeechTask.createSayTextTask(speechService, "2"),
//                SpeechTask.createSayTextTask(speechService, "1"),
//                SpeechTask.createSayTextTask(speechService, "1", 1.0f, 1.5f),
//                SpeechTask.createSayTextTask(speechService, "1", 2.0f, 2.0f),
//                SpeechTask.createSayTextTask(speechService, "1", 3.0f, 3.0f),
//                SpeechTask.createSayTextTask(speechService, "1", 4.0f, 3.0f),
//                SpeechTask.createSayTextTask(speechService, "1"),
//                SpeechTask.createSayTextTask(speechService, "1"),
//
//                SpeechTask.createSayTextTask(speechService, "   Ahem", 1.0f, 0.6f),
//                SpeechTask.createResetDefaultsTask(speechService),
//                SpeechTask.createSayTextTask(speechService, "Sorry about that, there must be something wrong with my programming"),
//
//            )
//
            val tasks = arrayListOf<BaseTask>(
                SpeechTask.createSetLocaleTask(speechService, Locale.JAPAN),
                SpeechTask.createSayTextTask(
                    speechService,
                    "こんにちは、幸せなハロウィーン"
                ), // Hello and happy halloween
                SpeechTask.createResetDefaultsTask(speechService)
            )
            val taskList = TaskList(tasks)
            scheduler.queueTask(taskList)
            val newTask = SpeechTask.createSayTextTask(
                speechService,
                "Hey, I started a second task!"
            )
            scheduler.queueTask(newTask)

//            val image = BitmapFactory.decodeResource(
//                this.resources,
//                R.drawable.hal_9000
//            )
//            printService.printImage(image)

        }
    }

//    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
//        ContextCompat.checkSelfPermission(
//            baseContext, it) == PackageManager.PERMISSION_GRANTED
//    }

    private fun getOutputDirectory(): File {
        val mediaDir = externalMediaDirs.firstOrNull()?.let {
            File(it, resources.getString(R.string.app_name)).apply { mkdirs() } }
        return if (mediaDir != null && mediaDir.exists())
            mediaDir else filesDir
    }

    override fun onDestroy() {
        super.onDestroy()
    }



    // TODO start and shutDown on Camera movement detection for voice etc service


    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        PermissionHelper.onRequestPermissionsResult(this, requestCode, permissions, grantResults)
    }

    // SpeechHandler
    override fun onPartialResults(results: ArrayList<String>) {
        parseSpeechResults(results)
    }

    override fun onStartOfSpeech() {
        TODO("Not yet implemented")
    }

    override fun onEndOfSpeech() {
        TODO("Not yet implemented")
    }

    override fun onResults(results: ArrayList<String>) {
        parseSpeechResults(results)
    }

    private fun parseSpeechResults(results: ArrayList<String>) {
        for (command in results) {
            if (command == "camera") {
                // Do task
            }
        }
    }


    // Activity Detection

    override fun onLuminosityChange(averageLuminosity: Double, currentLuminosity: Double) {
        if (currentState == AppState.IDLE) {
            Log.e("Going Active from luminosity", "Average: $averageLuminosity Current: $currentLuminosity")
            currentState = AppState.ACTIVE

            scheduler.queueTask(SpeechTask.createSayTextTask(speechService, "Hello there!"))
        }
    }

    override fun onLuminosityNormal(averageLuminosity: Double) {
        if (currentState == AppState.ACTIVE) {
            Log.e("Going Idle from luminosity", "Luminosity: $averageLuminosity")
            currentState = AppState.IDLE

            scheduler.queueTask(SpeechTask.createSayTextTask(speechService, "Goodbye!"))
        }
    }

}
