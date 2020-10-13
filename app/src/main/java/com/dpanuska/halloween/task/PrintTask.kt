package com.dpanuska.halloween.task

import android.graphics.Bitmap
import com.dpanuska.halloween.service.PrintService
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers

object PrintTask {

    val dispater = Dispatchers.IO

    fun createPrintImageTask(image: Bitmap): BaseTask {
        return BaseTask(printImageTaskBlock(image), dispater)
    }

    fun printImageTaskBlock(image: Bitmap): TaskBlock {
        return {
            PrintTask.printImageTaskBlockAsync(image)
        }
    }

    fun printImageTaskBlockAsync(image: Bitmap): Deferred<TaskResult> {
        PrintService.printImage(image);
        val result = CompletableDeferred<TaskResult>()
        return result
    }
}