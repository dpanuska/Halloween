package com.dpanuska.halloween.task

import android.graphics.Bitmap
import com.dpanuska.halloween.service.PrintService
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred

object PrintTask {

    fun createPrintImageTask(service: PrintService, image: Bitmap): BaseTask {
        return BaseTask(
            PrintTask.printImageTaskBlock(service, image)
        )
    }

    fun printImageTaskBlock(service: PrintService, image: Bitmap): TaskBlock {
        return {
            PrintTask.printImageTaskBlockAsync(service, image)
        }
    }

    fun printImageTaskBlockAsync(service: PrintService, image: Bitmap): Deferred<TaskResult> {
        service.printImage(image);
        val result = CompletableDeferred<TaskResult>()
        return result
    }
}