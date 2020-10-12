package com.dpanuska.halloween.task

import android.graphics.Bitmap
import com.dpanuska.halloween.service.VisualService
import kotlinx.coroutines.Deferred


object VisualTask {

    fun createHideOverlayTask(service: VisualService): BaseTask {
        return BaseTask(
            hideOverlayBlock(service)
        )
    }

    fun hideOverlayBlock(service: VisualService): TaskBlock {
        return {
            hideOverlayBlockAsync(service)
        }
    }

    fun hideOverlayBlockAsync(service: VisualService): Deferred<TaskResult> {
        service.hide()
        return TaskHelper.syncSuccessResultAsync()
    }



    fun createSetBackgroundTask(service: VisualService, resId: Int): BaseTask {
        return BaseTask(
            setBackgroundBlock(service, resId)
        )
    }

    fun setBackgroundBlock(service: VisualService, resId: Int): TaskBlock {
        return {
            setBackgroundBlockAsync(service, resId)
        }
    }

    fun setBackgroundBlockAsync(service: VisualService, resId: Int): Deferred<TaskResult> {
        service.showBackgroundImage(resId)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Bitmap
    fun createSetBackgroundTask(service: VisualService, bitmap: Bitmap): BaseTask {
        return BaseTask(
            setBackgroundBlock(service, bitmap)
        )
    }

    fun setBackgroundBlock(service: VisualService, bitmap: Bitmap): TaskBlock {
        return {
            setBackgroundBlockAsync(service, bitmap)
        }
    }

    fun setBackgroundBlockAsync(service: VisualService, bitmap: Bitmap): Deferred<TaskResult> {
        service.showBackgroundImage(bitmap)
        return TaskHelper.syncSuccessResultAsync()
    }

    // Gif
    fun createSetBackgroundGifTask(service: VisualService, resId: Int): BaseTask {
        return BaseTask(
            setBackgroundGifBlock(service, resId)
        )
    }

    fun setBackgroundGifBlock(service: VisualService, resId: Int): TaskBlock {
        return {
            setBackgroundGifBlockAsync(service, resId)
        }
    }

    fun setBackgroundGifBlockAsync(service: VisualService, resId: Int): Deferred<TaskResult> {
        service.showBackgroundGif(resId)
        return TaskHelper.syncSuccessResultAsync()
    }
}