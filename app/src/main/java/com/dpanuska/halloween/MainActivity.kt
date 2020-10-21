package com.dpanuska.halloween

import android.os.Bundle
import android.util.Log
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
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
import java.io.File
import java.util.*
import kotlin.collections.ArrayList


enum class AppState {
    IDLE,
    ACTIVE
}

val cameraCommands = arrayListOf<String>("camera", "picture", "photo")
val camConfirmCommands = arrayListOf<String>("yes")
val camCancelCommands = arrayListOf<String>("cancel", "abort")
val camRetryCommands = arrayListOf<String>("retry", "no")


class MainActivity : AppCompatActivity(), SpeechHandler, LuminosityCallbackHandler {

    val runTestTasks = false

    var luminosityListener = LuminosityListener(this)

    var scheduler = TaskScheduler(Dispatchers.Default)
    val taskLoader = TaskLoader()
    val testLoader = TaskLoader()
    var currentState = AppState.IDLE

    var stateSwitchTask: TimerTask? = null
    var goodbyeTask: TimerTask? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        // Hide bars
        window.setDecorFitsSystemWindows(false)
        val controller = window.insetsController
        if (controller != null) {
            controller.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
            controller.systemBarsBehavior =
                WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        }

        // Load Tasks
        taskLoader.loadFromJSONResource(resources, R.raw.tasks_base)
        taskLoader.loadFromJSONResource(resources, R.raw.tasks_intro)
        taskLoader.loadFromJSONResource(resources, R.raw.tasks_greeting)
        taskLoader.loadFromJSONResource(resources, R.raw.tasks_bye)
        taskLoader.loadFromJSONResource(resources, R.raw.tasks_camera)
        testLoader.loadFromJSONResource(resources, R.raw.tasks_test)

        // Check permissions
        PermissionHelper.checkAllPermissions(this)

        // Start services
        PrintService.start(this)
        SpeechService.start(this)
        VoiceRecognitionService.start(applicationContext, this)
        FileService.start(this)
        VisualService.start(this, overlayLayout)

        CameraService.start(
            this,
            this,
            viewFinder.surfaceProvider,
            luminosityListener.analyzer
        )

        if (runTestTasks) {
            val runTestTask = object : TimerTask() {
                override fun run() {
                    val tasks = testLoader.getAllTasks()
                    for (task in tasks) {
                        scheduler.queueTask(task)
                    }
                }
            }
            Timer().schedule(runTestTask, 1000)
        }

        // TODO check if bluetooth supported
        //startActivityForResult(Intent(this, ScanningActivity::class.java), ScanningActivity.SCANNING_FOR_PRINTER)
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray) {
        PermissionHelper.onRequestPermissionsResult(this, requestCode, permissions, grantResults)
    }

    // SpeechHandler
    override fun onPartialResults(result: String) {
        parseSpeechResults(result)
    }

    override fun onStartOfSpeech() {
        TODO("Not yet implemented")
    }

    override fun onEndOfSpeech() {
        TODO("Not yet implemented")
    }

    override fun onResults(result: String) {
//        parseSpeechResults(result)
    }

    private fun parseSpeechResults(result: String) {
        if (cameraCommands.contains(result)) {
            VoiceRecognitionService.stopListening()

            val cameraTask = taskLoader.getRandomTaskOfType("CAMERA_START")
            cameraTask?.completionHandler = {
                VoiceRecognitionService.setRecognitionType(VoiceRecognitionService.RecognitionType.CAMERA)
            }
            scheduler.queueTask(cameraTask!!, true)
        } else if (camConfirmCommands.contains(result)) {
            VoiceRecognitionService.stopListening()
            // TODO Print!
        } else if (camCancelCommands.contains(result)) {
            VoiceRecognitionService.stopListening()
            // TODO Cancel camera
        } else if (camRetryCommands.contains(result)) {
            VoiceRecognitionService.stopListening()
            // Retry
            val cameraTask = taskLoader.getTaskByName("CAMERA_START_DEFAULT")
            cameraTask?.completionHandler = {
                VoiceRecognitionService.setRecognitionType(VoiceRecognitionService.RecognitionType.CAMERA)
            }
            scheduler.queueTask(cameraTask!!, true)
        }
    }


    // Activity Detection


    override fun onLuminosityChange(averageLuminosity: Double, currentLuminosity: Double) {
        goodbyeTask?.cancel()
        goodbyeTask = null
        if (currentState == AppState.IDLE && stateSwitchTask == null) {
            stateSwitchTask = object: TimerTask() {
                override fun run() {
                    Log.e(
                        "Going Active from luminosity",
                        "Average: $averageLuminosity Current: $currentLuminosity"
                    )
                    currentState = AppState.ACTIVE

                    val task = taskLoader.getRandomTaskOfType("GREETING")
                    scheduler.queueTask(task!!, true)
                }
            }
            Timer().schedule(stateSwitchTask!!, 500)
        }
    }

    override fun onLuminosityNormal(averageLuminosity: Double) {
        stateSwitchTask?.cancel()
        stateSwitchTask = null
        if (currentState == AppState.ACTIVE && goodbyeTask == null) {
            goodbyeTask = object: TimerTask() {
                override fun run() {
                    Log.e("Going Idle from luminosity", "Luminosity: $averageLuminosity")
                    currentState = AppState.IDLE

                    val task = taskLoader.getRandomTaskOfType("GOODBYE")
                    scheduler.queueTask(task!!, true)
                }
            }
            Timer().schedule(goodbyeTask, 500)

        }
    }

}
