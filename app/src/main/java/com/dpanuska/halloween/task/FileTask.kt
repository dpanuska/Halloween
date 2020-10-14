package com.dpanuska.halloween.task

import android.graphics.Bitmap
import android.util.Log
import com.dpanuska.halloween.service.FileService
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import java.io.File
import java.lang.Exception

// TODO make this shit easier. 3 functions.. comeon man
object FileTask {

    val dispatcher = Dispatchers.IO
    const val TAG = "FileTask"

    fun createSaveImageTask(outDir: File): BaseTask {
        return BaseTask(saveImageBlock(outDir))
    }

    fun saveImageBlock(outDir: File): TaskBlock {
        return {
            val bitmap = it as? Bitmap ?: throw Exception("Image not passed from previous task")
            Log.e(TAG, "Starting Save Image task")
            saveImageBlockAsync(bitmap, outDir)
        }
    }

    fun createSaveImageTask(image: Bitmap, outDir: File): BaseTask {
        return BaseTask(saveImageBlock(image, outDir), dispatcher)
    }

    fun saveImageBlock(image: Bitmap, outDir: File): TaskBlock {
        return {
            Log.e(TAG, "Starting Save Image task")
            saveImageBlockAsync(image, outDir)
        }
    }

    fun saveImageBlockAsync(image: Bitmap, outDir: File): Deferred<TaskResult> {
        FileService.saveBitmap(image, outDir)
        return TaskHelper.syncSuccessResultAsync()
    }
}