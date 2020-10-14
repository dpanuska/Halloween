package com.dpanuska.halloween.task

import android.graphics.Bitmap
import android.util.Log
import com.dpanuska.halloween.service.VisualService
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import java.lang.Exception


object VisualTask {

    val dispatcher = Dispatchers.Main
    const val TAG = "VisualTask"

    fun createHideOverlayTask(): BaseTask {
        return BaseTask(hideOverlayBlock(), dispatcher)
    }

    fun hideOverlayBlock(): TaskBlock {
        return {
            Log.e(TAG, "Starting Hide Overlay task")
            hideOverlayBlockAsync()
        }
    }

    fun hideOverlayBlockAsync(): Deferred<TaskResult> {
        VisualService.hide()
        return TaskHelper.syncSuccessResultAsync()
    }


    fun createSetBackgroundTask(resId: Int): BaseTask {
        return BaseTask(setBackgroundBlock(resId), dispatcher)
    }

    fun setBackgroundBlock(resId: Int): TaskBlock {
        return {
            Log.e(TAG, "Starting Set Image task")
            setBackgroundBlockAsync(resId)
        }
    }

    fun setBackgroundBlockAsync(resId: Int): Deferred<TaskResult> {
        VisualService.showBackgroundImage(resId)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Bitmap
    fun createSetBackgroundTask(bitmap: Bitmap): BaseTask {
        return BaseTask(setBackgroundBlock(bitmap), dispatcher)
    }

    fun createSetBackgroundTask(): BaseTask {
        return BaseTask(setBackgroundBlock(), dispatcher)
    }

    fun setBackgroundBlock(): TaskBlock {
        return {
            val bitmap = it as? Bitmap ?: throw(Exception("Bitmap not passed to set background block"))
            Log.e(TAG, "Starting Set Image task")
            setBackgroundBlockAsync(bitmap)
        }
    }

    fun setBackgroundBlock(bitmap: Bitmap): TaskBlock {
        return {
            Log.e(TAG, "Starting Set Image task")
            setBackgroundBlockAsync(bitmap)
        }
    }

    fun setBackgroundBlockAsync(bitmap: Bitmap): Deferred<TaskResult> {
        VisualService.showBackgroundImage(bitmap)
        return TaskHelper.syncSuccessResultAsync(bitmap)
    }

    // Gif
    fun createSetBackgroundGifTask(resId: Int): BaseTask {
        return BaseTask(setBackgroundGifBlock(resId), dispatcher)
    }

    fun setBackgroundGifBlock(resId: Int): TaskBlock {
        return {
            Log.e(TAG, "Starting Set GIF task")
            setBackgroundGifBlockAsync(resId)
        }
    }

    fun setBackgroundGifBlockAsync(resId: Int): Deferred<TaskResult> {
        VisualService.showBackgroundGif(resId)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Text
    fun createSetTextTask(text: String): BaseTask {
        return BaseTask(setTextBlock(text), dispatcher)
    }

    fun setTextBlock(text: String): TaskBlock {
        return {
            Log.e(TAG, "Starting Set Text task")
            setTextBlockAsync(text)
        }
    }

    fun setTextBlockAsync(text: String): Deferred<TaskResult> {
        VisualService.setText(text)
        return TaskHelper.syncSuccessResultAsync()
    }
}