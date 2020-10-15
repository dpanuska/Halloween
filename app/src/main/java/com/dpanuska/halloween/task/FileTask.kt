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


    fun createSaveImageTask(suspend: Boolean = false): BaseTask {
        return BaseTask(saveImageBlock(), dispatcher, suspend)
    }

    fun saveImageBlock(): TaskBlock {
        return {
            val bitmap = it as? Bitmap ?: throw Exception("Image not passed from previous task")
            Log.e(TAG, "Starting Save Image task")
            saveImageBlockAsync(bitmap)
        }
    }

    fun createSaveImageTask(image: Bitmap, suspend: Boolean = false): BaseTask {
        return BaseTask(saveImageBlock(image), dispatcher, suspend)
    }

    fun saveImageBlock(image: Bitmap): TaskBlock {
        return {
            Log.e(TAG, "Starting Save Image task")
            saveImageBlockAsync(image)
        }
    }

    fun saveImageBlockAsync(image: Bitmap): Deferred<TaskResult> {
        FileService.saveBitmap(image)
        return TaskHelper.syncSuccessResultAsync()
    }
}