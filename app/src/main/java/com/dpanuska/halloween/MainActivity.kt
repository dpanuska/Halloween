package com.dpanuska.halloween

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.MotionEvent
import android.view.WindowInsets
import android.view.WindowInsetsController
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import androidx.lifecycle.lifecycleScope
import com.dpanuska.halloween.analysis.*
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
import java.util.*



enum class AppState {
    IDLE,
    ACTIVE
}

val cameraCommands = arrayListOf<String>("camera", "picture", "photo")
val camConfirmCommands = arrayListOf<String>("yes")
val camCancelCommands = arrayListOf<String>("cancel", "abort")
val camRetryCommands = arrayListOf<String>("retry", "no")


class MainActivity : AppCompatActivity(), SpeechHandler, LuminosityCallbackHandler,
    DetectionCallbackHandler {

    val runTestTasks = false

    var poseAnalyzer = PoseAnalyzer(this)

    var scheduler = TaskScheduler(Dispatchers.Default)
    val taskLoader = TaskLoader()
    val testLoader = TaskLoader()


    var currentState = AppState.IDLE

    var stateSwitchTask: TimerTask? = null
    var goodbyeTask: TimerTask? = null
    var activeIdleTask: TimerTask? = null


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
        taskLoader.loadFromJSONResource(resources, R.raw.tasks_idle)
        taskLoader.loadFromJSONResource(resources, R.raw.tasks_greeting)
        taskLoader.loadFromJSONResource(resources, R.raw.tasks_bye)
        taskLoader.loadFromJSONResource(resources, R.raw.tasks_camera)


        testLoader.loadFromJSONResource(resources, R.raw.tasks_test)

        // Check permissions
        PermissionHelper.checkAllPermissions(this)

        // Start services
        //PrintService.start(this)
        SpeechService.start(this)
        VoiceRecognitionService.start(applicationContext, this)
        FileService.start(this)
        VisualService.start(this, overlayLayout)

        CameraService.start(
            this,
            this,
            viewFinder.surfaceProvider,
            poseAnalyzer
        )

        val initTask = object : TimerTask() {
            override fun run() {
                taskLoader.getRandomTaskOfType("IDLE")?.let { scheduler.queueTask(it) }

                if (runTestTasks) {
                    val tasks = testLoader.getAllTasks()
                    for (task in tasks) {
                        scheduler.queueTask(task)
                    }
                }
            }
        }
        Timer().schedule(initTask, 1000)
    }

    override fun onTouchEvent(event: MotionEvent?): Boolean {
        scheduler.queueTask(taskLoader.getRandomTaskOfType("DONT_TOUCH")!!, true)

        if (currentState == AppState.ACTIVE) {
            createActiveIdleTask()
        }
        return super.onTouchEvent(event)
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
                //VoiceRecognitionService.setRecognitionType(VoiceRecognitionService.RecognitionType.CAMERA)
            }
            scheduler.queueTask(cameraTask!!, true)
        } else if (camConfirmCommands.contains(result)) {
            VoiceRecognitionService.stopListening()
            // TODO Print!
            val shareIntent = Intent(Intent.ACTION_SEND)
            shareIntent.type = "image/jpg"
            shareIntent.setPackage("com.android.bluetooth");
            shareIntent.flags = Intent.FLAG_GRANT_READ_URI_PERMISSION;
            shareIntent.putExtra(Intent.EXTRA_STREAM, FileProvider.getUriForFile(this, applicationContext.getPackageName() + ".provider", FileService.lastSavedFile!!))
            startActivity(Intent.createChooser(shareIntent, "Share image using"))
        } else if (camCancelCommands.contains(result)) {
            VoiceRecognitionService.stopListening()
            // TODO Cancel camera
        } else if (camRetryCommands.contains(result)) {
            VoiceRecognitionService.stopListening()
            // Retry
            val cameraTask = taskLoader.getTaskByName("CAMERA_START_DEFAULT")
            cameraTask?.completionHandler = {
                //VoiceRecognitionService.setRecognitionType(VoiceRecognitionService.RecognitionType.CAMERA)
            }
            scheduler.queueTask(cameraTask!!, true)
        }
    }


    // Activity Detection

    // DetectionCallbackHandler

    override fun onObjectDetected() {
        handleActivation()
    }

    override fun onNoObjectDetected() {
        handleDeactivation()
    }


    /**
     * Create an active idle task on timer to display random "ACTIVE_IDLE" task
     */
    private fun createActiveIdleTask() {
        activeIdleTask?.cancel()
        activeIdleTask = object : TimerTask() {
            override fun run() {
                val task = taskLoader.getRandomTaskOfType("ACTIVE_IDLE")
                task?.completionHandler = {
                    createActiveIdleTask()
                }
                scheduler.queueTask(task!!)
            }
        }
        Timer().schedule(activeIdleTask!!, 5000)
    }

    /**
     * Call when "objects" detected from analyzer. Waits amount of time in case "object" is just passing by
     */
    private fun handleActivation() {
        goodbyeTask?.cancel()
        goodbyeTask = null
        if (currentState == AppState.IDLE && stateSwitchTask == null) {
            stateSwitchTask = object: TimerTask() {
                override fun run() {
                    currentState = AppState.ACTIVE

                    val task = taskLoader.getRandomTaskOfType("GREETING")
                    task?.completionHandler = {
                        if (currentState == AppState.ACTIVE) {
                            createActiveIdleTask()
                        }
                    }
                    scheduler.queueTask(task!!, true)
                }
            }
            Timer().schedule(stateSwitchTask!!, 200)
        }
    }

    /**
     * Call when no "objects" detected from analyzer. Waits amount of time in case "object" is out of view but may still be around
     */
    private fun handleDeactivation() {
        stateSwitchTask?.cancel()
        stateSwitchTask = null
        if (currentState == AppState.ACTIVE && goodbyeTask == null) {
            goodbyeTask = object: TimerTask() {
                override fun run() {
                    currentState = AppState.IDLE
                    activeIdleTask?.cancel()

                    val task = taskLoader.getRandomTaskOfType("GOODBYE")
                    scheduler.queueTask(task!!, true)
                }
            }
            Timer().schedule(goodbyeTask, 2000)

        }
    }

    // Luminosity

    override fun onRawLuminosity(averageLuminosity: Double, currentLuminosity: Double) {
        lifecycleScope.launch(Dispatchers.Main) {
            debugTextView.text = "Avg: $averageLuminosity \n Curr: $currentLuminosity \n Diff: ${averageLuminosity - currentLuminosity}"
        }
    }

    override fun onLuminosityChange(averageLuminosity: Double, currentLuminosity: Double) {
        handleActivation()
    }

    override fun onLuminosityNormal(averageLuminosity: Double) {
        handleDeactivation()
    }

}
