package com.dpanuska.halloween.service.camera

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.media.Image
import android.util.Log
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import java.util.concurrent.Executor
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors


class CameraService {

    private var imageCapture: ImageCapture? = null
   // private lateinit var outputDirectory: File
    private lateinit var cameraExecutor: ExecutorService
    private lateinit var mainExecutor: Executor

    fun start(context: Context,
              lifecycleOwner: LifecycleOwner,
              surfaceProvider: Preview.SurfaceProvider,
              analyzer: ImageAnalysis.Analyzer,
              cameraSelector: CameraSelector = CameraSelector.DEFAULT_FRONT_CAMERA) {

        cameraExecutor = Executors.newSingleThreadExecutor()
        mainExecutor = ContextCompat.getMainExecutor(context)

        val cameraProviderFuture = ProcessCameraProvider.getInstance(context)

        cameraProviderFuture.addListener(Runnable {
            // Used to bind the lifecycle of cameras to the lifecycle owner
            val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()

            // Preview
            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(surfaceProvider)
                }

            imageCapture = ImageCapture.Builder()
                .build()

            val imageAnalyzer = ImageAnalysis.Builder()
                .build()
                .also {
                    it.setAnalyzer(cameraExecutor, analyzer)
                }


            try {
                // Unbind use cases before rebinding
                cameraProvider.unbindAll()

                // Bind use cases to camera
                cameraProvider.bindToLifecycle(
                    lifecycleOwner, cameraSelector, preview, imageCapture, imageAnalyzer)

            } catch(exc: Exception) {
                Log.e(TAG, "Use case binding failed", exc)
            }

        },  mainExecutor)
    }

    fun shutDown() {
        cameraExecutor.shutdown()
    }

    fun takePhotoAsync(): Deferred<Bitmap> {
        val result = CompletableDeferred<Bitmap>();
        // Get a stable reference of the modifiable image capture use case
        val imageCapture = imageCapture ?: throw(Exception("No imageCapture"))

        // Set up image capture listener, which is triggered after photo has
        // been taken
        imageCapture.takePicture(cameraExecutor, object: ImageCapture.OnImageCapturedCallback() {
            override fun onError(exc: ImageCaptureException) {
                Log.e(TAG, "Photo capture failed: ${exc.message}", exc)
                throw(exc)
            }

            @SuppressLint("UnsafeExperimentalUsageError")
            override fun onCaptureSuccess(image: ImageProxy) {
                Log.e(TAG, "Photo capture success")
                val bitmap = image.image?.toBitmap()
                 result.complete(bitmap!!)
            }
        })

        return result
    }

    companion object {
        private val TAG = CameraService::class.java.simpleName
    }

}

fun Image.toBitmap(): Bitmap {
    val buffer = planes[0].buffer
    buffer.rewind()
    val bytes = ByteArray(buffer.capacity())
    buffer.get(bytes)
    return BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
}