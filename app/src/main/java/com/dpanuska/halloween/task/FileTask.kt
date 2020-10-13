package com.dpanuska.halloween.task

import android.graphics.Bitmap
import com.dpanuska.halloween.service.FileService
import kotlinx.coroutines.Deferred
import java.io.File

// TODO make this shit easier. 3 functions.. comeon man
object FileTask {

    fun createSaveImageTask(image: Bitmap, outDir: File): BaseTask {
        return BaseTask(
            saveImageBlock(image, outDir)
        )
    }

    fun saveImageBlock(image: Bitmap, outDir: File): TaskBlock {
        return {
            saveImageBlockAsync(image, outDir)
        }
    }

    fun saveImageBlockAsync(image: Bitmap, outDir: File): Deferred<TaskResult> {
        FileService.saveBitmap(image, outDir)
        return TaskHelper.syncSuccessResultAsync()
    }
}