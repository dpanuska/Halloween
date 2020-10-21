package com.dpanuska.halloween.analysis

import android.graphics.Rect
import android.util.Log
import com.google.android.gms.tasks.Task
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.objects.DetectedObject
import com.google.mlkit.vision.objects.ObjectDetection
import com.google.mlkit.vision.objects.defaults.ObjectDetectorOptions
import java.io.IOException

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
        for (detectedObject in results) {
            val boundingBox = detectedObject.boundingBox
            val trackingId = detectedObject.trackingId
            for (label in detectedObject.labels) {
                val text = label.text
                val index = label.index
                val confidence = label.confidence
            }
        }
//        if (results.isNotEmpty()) {
//            handler.onFacesDetected()
//        } else {
//            handler.onNoFacesDetected()
//        }

    }

    override fun onFailure(e: Exception) {
        Log.w(TAG, "Detector failed.$e")
        handler.onNoObjectDetected()
    }

    companion object {
        private const val TAG = "ObjectAnalyzer"
    }

}