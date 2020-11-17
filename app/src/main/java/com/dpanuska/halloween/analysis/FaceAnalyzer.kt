package com.dpanuska.halloween.analysis

import android.graphics.Rect
import android.util.Log
import com.google.android.gms.tasks.Task
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.face.Face
import com.google.mlkit.vision.face.FaceDetection
import com.google.mlkit.vision.face.FaceDetectorOptions
import java.io.IOException


/**
 * Photo analyzer using mlkit to detect faces and report using DetectionCallbackHandler
 * Reports onObjectDetected anytime analysis detects a face and onNoObjectDetected otherwise
 * Not good for halloween considering masks. Used the bag on head test, and did not work well.
 * Note: Do not use bag on head test unless a professional - please don't suffocate
 */
class FaceAnalyzer(callbackHandler: DetectionCallbackHandler) : BaseImageAnalyzer<List<Face>>() {

    private val handler = callbackHandler

    // options
    private val realTimeOpts = FaceDetectorOptions.Builder()
        .setPerformanceMode(FaceDetectorOptions.PERFORMANCE_MODE_FAST)
        .setContourMode(FaceDetectorOptions.CONTOUR_MODE_NONE)
        .build()

    private val detector = FaceDetection.getClient(realTimeOpts)

    // detect
    override fun detectInImage(image: InputImage): Task<List<Face>> {
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
        results: List<Face>,
        rect: Rect
    ) {
        if (results.isNotEmpty()) {
            handler.onObjectDetected()
        } else {
            handler.onNoObjectDetected()
        }

    }

    override fun onFailure(e: Exception) {
        Log.w(TAG, "Face Detector failed.$e")
        handler.onNoObjectDetected()
    }

    companion object {
        private const val TAG = "FaceAnalyzer"
    }

}
