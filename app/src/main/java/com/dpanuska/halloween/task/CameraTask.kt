package com.dpanuska.halloween.task

import android.util.Log
import com.dpanuska.halloween.service.CameraService
import kotlinx.coroutines.*

/**
 * Factory to create Camera based tasks.
 */
object CameraTask {

    val dispatcher = Dispatchers.IO
    const val TAG = "CameraTask"

    fun createTakePhotoTask(suspend: Boolean = true): BaseTask {
        return BaseTask(takePhotoBlock(), dispatcher, suspend)
    }

    fun takePhotoBlock(): TaskBlock {
        return {
            Log.e(TAG, "Starting Take Photo Task")
            takePhotoBlockAsync()
        }
    }

    fun takePhotoBlockAsync(): Deferred<TaskResult> {
        val deferred = CompletableDeferred<TaskResult>()
        CoroutineScope(dispatcher).async {
            val result = CameraService.takePhotoAsync()
            val bitmap = result.await()
            deferred.complete(bitmap)
        }
        return deferred
    }
}