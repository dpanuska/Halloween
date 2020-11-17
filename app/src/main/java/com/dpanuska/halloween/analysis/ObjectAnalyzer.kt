package com.dpanuska.halloween.analysis

import android.graphics.Rect
import android.util.Log
import com.google.android.gms.tasks.Task
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.objects.DetectedObject
import com.google.mlkit.vision.objects.ObjectDetection
import com.google.mlkit.vision.objects.defaults.ObjectDetectorOptions
import java.io.IOException

/**
 * Photo analyzer using mlkit to detect objects and report using DetectionCallbackHandler
 * Reports onObjectDetected anytime analysis detects an object and onNoObjectDetected otherwise
 * Can use labels here for known types, not good for people detection
 */
class ObjectAnalyzer(callbackHandler: DetectionCallbackHandler) : BaseImageAnalyzer<List<DetectedObject>>() {

    private val handler = callbackHandler

    // options
    val options = ObjectDetectorOptions.Builder()
        .setDetectorMode(ObjectDetectorOptions.STREAM_MODE)
        .enableClassification()  // Optional
        .build()


    private val detector = ObjectDetection.getClient(options)

    // detect
    override fun detectInImage(image: InputImage): Task<List<DetectedObject>> {
        return detector.process(image)
    }

    override fun stop() {
        try {
            detector.close()
        } catch (e: IOException) {
            Log.e(TAG, "Exception thrown while trying to close Detector: $e")
        }
    }

    override fun onSuccess(
        results: List<DetectedObject>,
        rect: Rect
    ) {
        if (results.isNotEmpty()) {
            handler.onObjectDetected()
        } else {
            handler.onNoObjectDetected()
        }

    }

    override fun onFailure(e: Exception) {
        Log.w(TAG, "Detector failed.$e")
        handler.onNoObjectDetected()
    }

    companion object {
        private const val TAG = "ObjectAnalyzer"
    }

}