package com.dpanuska.halloween.task

import android.graphics.Bitmap
import com.dpanuska.halloween.service.VisualService
import kotlinx.coroutines.Deferred


object VisualTask {

    fun createHideOverlayTask(): BaseTask {
        return BaseTask(
            hideOverlayBlock()
        )
    }

    fun hideOverlayBlock(): TaskBlock {
        return {
            hideOverlayBlockAsync()
        }
    }

    fun hideOverlayBlockAsync(): Deferred<TaskResult> {
        VisualService.hide()
        return TaskHelper.syncSuccessResultAsync()
    }



    fun createSetBackgroundTask(resId: Int): BaseTask {
        return BaseTask(
            setBackgroundBlock(resId)
        )
    }

    fun setBackgroundBlock(resId: Int): TaskBlock {
        return {
            setBackgroundBlockAsync(resId)
        }
    }

    fun setBackgroundBlockAsync(resId: Int): Deferred<TaskResult> {
        VisualService.showBackgroundImage(resId)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Bitmap
    fun createSetBackgroundTask(bitmap: Bitmap): BaseTask {
        return BaseTask(
            setBackgroundBlock(bitmap)
        )
    }

    fun setBackgroundBlock(bitmap: Bitmap): TaskBlock {
        return {
            setBackgroundBlockAsync(bitmap)
        }
    }

    fun setBackgroundBlockAsync(bitmap: Bitmap): Deferred<TaskResult> {
        VisualService.showBackgroundImage(bitmap)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Gif
    fun createSetBackgroundGifTask(resId: Int): BaseTask {
        return BaseTask(
            setBackgroundGifBlock(resId)
        )
    }

    fun setBackgroundGifBlock(resId: Int): TaskBlock {
        return {
            setBackgroundGifBlockAsync(resId)
        }
    }

    fun setBackgroundGifBlockAsync(resId: Int): Deferred<TaskResult> {
        VisualService.showBackgroundGif(resId)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Text
    fun createSetTextTask(text: String): BaseTask {
        return BaseTask(
            setTextBlock(text)
        )
    }

    fun setTextBlock(text: String): TaskBlock {
        return {
            setTextBlockAsync(text)
        }
    }

    fun setTextBlockAsync(text: String): Deferred<TaskResult> {
        VisualService.setText(text)
        return TaskHelper.syncSuccessResultAsync()
    }
}