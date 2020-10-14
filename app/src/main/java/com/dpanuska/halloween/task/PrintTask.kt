package com.dpanuska.halloween.task

import android.graphics.Bitmap
import android.util.Log
import com.dpanuska.halloween.service.PrintService
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers

object PrintTask {

    val dispater = Dispatchers.IO
    const val TAG = "PrintTask"

    fun createPrintImageTask(image: Bitmap): BaseTask {
        return BaseTask(printImageTaskBlock(image), dispater)
    }

    fun printImageTaskBlock(image: Bitmap): TaskBlock {
        return {
            Log.e(TAG, "Starting Print Image task")
            PrintTask.printImageTaskBlockAsync(image)
        }
    }

    fun printImageTaskBlockAsync(image: Bitmap): Deferred<TaskResult> {
        PrintService.printImage(image);
        val result = CompletableDeferred<TaskResult>()
        return result
    }
}