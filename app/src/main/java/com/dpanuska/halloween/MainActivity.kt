package com.dpanuska.halloween

import android.os.Bundle
import android.util.Log
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.dpanuska.halloween.permissions.PermissionHelper
import com.dpanuska.halloween.service.CameraService
import com.dpanuska.halloween.service.FileService
import com.dpanuska.halloween.service.PrintService
import com.dpanuska.halloween.service.SpeechService
import com.dpanuska.halloween.service.VisualService
import com.dpanuska.halloween.service.SpeechHandler
import com.dpanuska.halloween.service.VoiceRecognitionService
import com.dpanuska.halloween.task.*
import com.dpanuska.halloween.task.load.TaskLoader
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.File
import java.util.*
import kotlin.collections.ArrayList


enum class AppState {
    IDLE,
    ACTIVE
}

class MainActivity : AppCompatActivity(), SpeechHandler, LuminosityCallbackHandler {

    var luminosityListener = LuminosityListener(this)

    var scheduler = TaskScheduler(Dispatchers.Default)
    var mainScheduler = TaskScheduler(Dispatchers.Main)
    val taskLoader = TaskLoader()
    var currentState = AppState.IDLE


    // CAMERA
    private lateinit var outputDirectory: File

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        window.setDecorFitsSystemWindows(false)
        val controller = window.insetsController
        if (controller != null) {
            controller.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
            controller.systemBarsBehavior =
                WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        }


        taskLoader.loadFromJSONResource(resources, R.raw.test)


        PermissionHelper.checkAllPermissions(this)

        // CAMERA
        outputDirectory = getOutputDirectory()

        PrintService.start(this)
        SpeechService.start(this)
        VoiceRecognitionService.start(applicationContext, this)
        FileService.start(this)
        VisualService.start(this, overlayLayout)

        CameraService.start(
            this,
            this,
            viewFinder.createSurfaceProvider(),
            luminosityListener.analyzer
        )

        // TODO check if bluetooth supported
        //startActivityForResult(Intent(this, ScanningActivity::class.java), ScanningActivity.SCANNING_FOR_PRINTER)

        val button = findViewById<Button>(R.id.button)
        button?.setOnClickListener() {

            lifecycleScope.launch {
                val result = CameraService.takePhotoAsync()
                val bitmap = result.await()

                scheduler.queueTask(
                    FileTask.createSaveImageTask(
                        bitmap,
                        outputDirectory
                    )
                )

                // TODO bitmap is presented flipped horizontally
                val tasks = arrayListOf<BaseTask>(
                    VisualTask.createSetBackgroundTask(bitmap),
                    TaskHelper.createDelayTask(3000),
                    VisualTask.createHideOverlayTask()
                )

                mainScheduler.queueTask(TaskList(tasks))
            }

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
            Log.e(
                "Going Active from luminosity",
                "Average: $averageLuminosity Current: $currentLuminosity"
            )
            currentState = AppState.ACTIVE

//            val tasks = arrayListOf<BaseTask>(
//                VisualTask.createSetBackgroundGifTask(R.raw.hello_there),
//                VisualTask.createSetTextTask("Hello There"),
//                SpeechTask.createSayTextTask("Hello there!"),
//                VisualTask.createSetTextTask("3"),
//                TaskHelper.createDelayTask(1000),
//                VisualTask.createSetTextTask("2"),
//            )

            val task = taskLoader.getRandomTaskOfType("GREETING")
            mainScheduler.queueTask(task!!, true)
        }
    }

    override fun onLuminosityNormal(averageLuminosity: Double) {
        if (currentState == AppState.ACTIVE) {
            Log.e("Going Idle from luminosity", "Luminosity: $averageLuminosity")
            currentState = AppState.IDLE

//            val tasks = arrayListOf<BaseTask>(
//                VisualTask.createSetBackgroundGifTask(R.raw.goodbye_kid),
//                SpeechTask.createSayTextTask("Goodbye!"),
//                TaskHelper.createDelayTask(2000),
//                VisualTask.createHideOverlayTask()
//            )
            val task = taskLoader.getRandomTaskOfType("GOODBYE")
            mainScheduler.queueTask(task!!, true)
        }
    }

}
