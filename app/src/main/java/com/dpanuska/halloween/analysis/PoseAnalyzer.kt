package com.dpanuska.halloween.analysis

import android.graphics.Rect
import android.util.Log
import com.google.android.gms.tasks.Task
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.pose.Pose
import com.google.mlkit.vision.pose.PoseDetection
import com.google.mlkit.vision.pose.defaults.PoseDetectorOptions
import java.io.IOException

class PoseAnalyzer(callbackHandler: DetectionCallbackHandler) : BaseImageAnalyzer<Pose>() {

    private val handler = callbackHandler

    // options
    val options = PoseDetectorOptions.Builder()
        .setDetectorMode(PoseDetectorOptions.STREAM_MODE)
        .build()


    private val detector = PoseDetection.getClient(options)

    // detect
    override fun detectInImage(image: InputImage): Task<Pose> {
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
        result: Pose,
        rect: Rect
    ) {
        if(result.allPoseLandmarks.isNotEmpty()) {
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
        private const val TAG = "PoseAnalyzer"
    }


}