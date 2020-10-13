package com.dpanuska.halloween.task

import android.graphics.Bitmap
import com.dpanuska.halloween.service.PrintService
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred

object PrintTask {

    fun createPrintImageTask(image: Bitmap): BaseTask {
        return BaseTask(
            PrintTask.printImageTaskBlock(image)
        )
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