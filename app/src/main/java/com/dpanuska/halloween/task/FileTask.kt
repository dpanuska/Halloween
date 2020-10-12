package com.dpanuska.halloween.task

import android.graphics.Bitmap
import com.dpanuska.halloween.service.FileService
import kotlinx.coroutines.Deferred
import java.io.File

// TODO make this shit easier. 3 functions.. comeon man
object FileTask {

    fun createSaveImageTask(service: FileService, image: Bitmap, outDir: File): BaseTask {
        return BaseTask(
            saveImageBlock(service, image, outDir)
        )
    }

    fun saveImageBlock(service: FileService, image: Bitmap, outDir: File): TaskBlock {
        return {
            saveImageBlockAsync(service, image, outDir)
        }
    }

    fun saveImageBlockAsync(service: FileService, image: Bitmap, outDir: File): Deferred<TaskResult> {
        service.saveBitmap(image, outDir)
        return TaskHelper.syncSuccessResultAsync()
    }
}