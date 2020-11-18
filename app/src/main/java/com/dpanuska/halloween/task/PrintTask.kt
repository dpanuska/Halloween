package com.dpanuska.halloween.task

import android.graphics.Bitmap
import android.util.Log
import com.dpanuska.halloween.service.PrintService
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers

/**
 * Factory to create Print based tasks.
 *
 * Unused until I potentially find out how to communicate directly with a bluetooth printer
 * without needing to use built in action intents (which show UI and need user interaction)
 */
object PrintTask {

    /*
    private val dispater = Dispatchers.IO
    const val TAG = "PrintTask"

    fun createPrintImageTask(image: Bitmap): BaseTask {
        return BaseTask(printImageTaskBlock(image), dispater)
    }

    private fun printImageTaskBlock(image: Bitmap): TaskBlock {
        return {
            Log.e(TAG, "Starting Print Image task")
            printImageTaskBlockAsync(image)
        }
    }

    private fun printImageTaskBlockAsync(image: Bitmap): Deferred<TaskResult> {
        //PrintService.printImage(image);
        val result = CompletableDeferred<TaskResult>()
        return result
    }
    */
}