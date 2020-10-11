package com.dpanuska.halloween.task

import com.dpanuska.halloween.service.visual.VisualService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.withContext


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
}