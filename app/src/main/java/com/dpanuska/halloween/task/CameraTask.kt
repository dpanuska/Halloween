package com.dpanuska.halloween.task

import android.util.Log
import com.dpanuska.halloween.service.CameraService
import kotlinx.coroutines.*

/**
 * Factory to create Camera based tasks.
 */
object CameraTask {

    private val dispatcher = Dispatchers.IO
    const val TAG = "CameraTask"

    /**
     * Create task to take a picture with the camera
     * This task returns a Bitmap result which can be used by subsequent tasks
     */
    fun createTakePhotoTask(suspend: Boolean = true): BaseTask {
        return BaseTask(takePhotoBlock(), dispatcher, suspend)
    }

    /**
     * Create task execution block for take picture task
     */
    private fun takePhotoBlock(): TaskBlock {
        return {
            Log.e(TAG, "Starting Take Photo Task")
            takePhotoBlockAsync()
        }
    }

    /**
     * Create async result for take picture task execution block
     */
    private fun takePhotoBlockAsync(): Deferred<TaskResult> {
        val deferred = CompletableDeferred<TaskResult>()
        CoroutineScope(dispatcher).async {
            val result = CameraService.takePhotoAsync()
            val bitmap = result.await()
            deferred.complete(bitmap)
        }
        return deferred
    }
}