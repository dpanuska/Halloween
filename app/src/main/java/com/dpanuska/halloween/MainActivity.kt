package com.dpanuska.halloween

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import com.dpanuska.halloween.permissions.PermissionHelper
import com.dpanuska.halloween.service.print.PrintService
import com.dpanuska.halloween.service.speech.SpeechService
import com.dpanuska.halloween.service.voice.SpeechHandler
import com.dpanuska.halloween.service.voice.VoiceRecognitionService
import com.dpanuska.halloween.task.BaseTask
import com.dpanuska.halloween.task.SpeechTask
import com.dpanuska.halloween.task.TaskList
import com.dpanuska.halloween.task.TaskScheduler
import com.mazenrashed.printooth.ui.ScanningActivity
import kotlinx.android.synthetic.main.activity_main.*
import java.io.File
import java.nio.ByteBuffer
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors


class MainActivity : AppCompatActivity(), SpeechHandler {

    var printService: PrintService = PrintService()
    var speechService: SpeechService = SpeechService()
    var voiceService = VoiceRecognitionService()
    var scheduler = TaskScheduler()
    lateinit var tts: TextToSpeech

    // CAMERA
    private var imageCapture: ImageCapture? = null
    private lateinit var outputDirectory: File
    private lateinit var cameraExecutor: ExecutorService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        PermissionHelper.checkAllPermissions(this)

        // CAMERA
        startCamera()
        outputDirectory = getOutputDirectory()
        cameraExecutor = Executors.newSingleThreadExecutor()

        printService.start(this)
        speechService.start(this)
        voiceService.start(this, this)


        // TODO check if bluetooth supported
        startActivityForResult(Intent(this, ScanningActivity::class.java), ScanningActivity.SCANNING_FOR_PRINTER)

        val button = findViewById<Button>(R.id.button)
        button?.setOnClickListener() {

            takePhoto()
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

    // CAMERA
    private fun takePhoto() {
        // Get a stable reference of the modifiable image capture use case
        val imageCapture = imageCapture ?: return

        // Create time-stamped output file to hold the image
        val photoFile = File(
            outputDirectory,
            SimpleDateFormat(FILENAME_FORMAT, Locale.US
            ).format(System.currentTimeMillis()) + ".jpg")

        // Create output options object which contains file + metadata
        val outputOptions = ImageCapture.OutputFileOptions.Builder(photoFile).build()

        // Set up image capture listener, which is triggered after photo has
        // been taken
        imageCapture.takePicture(
            outputOptions, ContextCompat.getMainExecutor(this), object : ImageCapture.OnImageSavedCallback {
                override fun onError(exc: ImageCaptureException) {
                    Log.e(TAG, "Photo capture failed: ${exc.message}", exc)
                }

                override fun onImageSaved(output: ImageCapture.OutputFileResults) {
                    val savedUri = Uri.fromFile(photoFile)
                    val msg = "Photo capture succeeded: $savedUri"
                    Toast.makeText(baseContext, msg, Toast.LENGTH_SHORT).show()
                    Log.d(TAG, msg)
                }
            })
    }

    // https://codelabs.developers.google.com/codelabs/camerax-getting-started/#3
    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener(Runnable {
            // Used to bind the lifecycle of cameras to the lifecycle owner
            val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()

            // Preview
            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(viewFinder.createSurfaceProvider())
                }

            imageCapture = ImageCapture.Builder()
                .build()

            val imageAnalyzer = ImageAnalysis.Builder()
                .build()
                .also {
                    it.setAnalyzer(cameraExecutor, LuminosityAnalyzer { luma ->
                        Log.d(TAG, "Average luminosity: $luma")
                    })
                }

            // Select back camera as a default
            val cameraSelector = CameraSelector.DEFAULT_FRONT_CAMERA

            try {
                // Unbind use cases before rebinding
                cameraProvider.unbindAll()

                // Bind use cases to camera
                cameraProvider.bindToLifecycle(
                    this, cameraSelector, preview, imageCapture, imageAnalyzer)

            } catch(exc: Exception) {
                Log.e(TAG, "Use case binding failed", exc)
            }

        }, ContextCompat.getMainExecutor(this))
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(
            baseContext, it) == PackageManager.PERMISSION_GRANTED
    }

    private fun getOutputDirectory(): File {
        val mediaDir = externalMediaDirs.firstOrNull()?.let {
            File(it, resources.getString(R.string.app_name)).apply { mkdirs() } }
        return if (mediaDir != null && mediaDir.exists())
            mediaDir else filesDir
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
    }

    companion object {
        private const val TAG = "CameraXBasic"
        private const val FILENAME_FORMAT = "yyyy-MM-dd-HH-mm-ss-SSS"
        private const val REQUEST_CODE_PERMISSIONS = 10
        private val REQUIRED_PERMISSIONS = arrayOf(Manifest.permission.CAMERA)
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
}


typealias LumaListener = (luma: Double) -> Unit

private class LuminosityAnalyzer(private val listener: LumaListener) : ImageAnalysis.Analyzer {

    private fun ByteBuffer.toByteArray(): ByteArray {
        rewind()    // Rewind the buffer to zero
        val data = ByteArray(remaining())
        get(data)   // Copy the buffer into a byte array
        return data // Return the byte array
    }

    override fun analyze(image: ImageProxy) {

        val buffer = image.planes[0].buffer
        val data = buffer.toByteArray()
        val pixels = data.map { it.toInt() and 0xFF }
        val luma = pixels.average()

        listener(luma)

        image.close()
    }
}