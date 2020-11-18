package com.dpanuska.halloween.task

import android.graphics.Bitmap
import android.util.Log
import com.dpanuska.halloween.service.FileService
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import java.lang.Exception

/**
 * Factory to create File IO based tasks.
 */
object FileTask {

    private val dispatcher = Dispatchers.IO
    const val TAG = "FileTask"


    /**
     * Create a save image task. This is a linked type task and requires a previous task to return
     * a Bitmap result (such as TAKE_PHOTO)
     */
    fun createSaveImageTask(suspend: Boolean = false): BaseTask {
        return BaseTask(saveImageBlock(), dispatcher, suspend)
    }

    private fun saveImageBlock(): TaskBlock {
        return {
            val bitmap = it as? Bitmap ?: throw Exception("Image not passed from previous task")
            Log.e(TAG, "Starting Save Image task")
            saveImageBlockAsync(bitmap)
        }
    }

    fun createSaveImageTask(image: Bitmap, suspend: Boolean = false): BaseTask {
        return BaseTask(saveImageBlock(image), dispatcher, suspend)
    }

    private fun saveImageBlock(image: Bitmap): TaskBlock {
        return {
            Log.e(TAG, "Starting Save Image task")
            saveImageBlockAsync(image)
        }
    }

    private fun saveImageBlockAsync(image: Bitmap): Deferred<TaskResult> {
        FileService.saveBitmap(image)
        return TaskHelper.syncSuccessResultAsync()
    }
}