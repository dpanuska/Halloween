package com.dpanuska.halloween.task

import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import java.util.*


object TaskHelper {

    fun syncSuccessResultAsync(): Deferred<TaskResult> {
        val result =  CompletableDeferred<TaskResult>()
        result.complete(Success(1))
        return result
    }

    fun createDelayTask(duration: Long): BaseTask {
        return BaseTask({
            delayTaskBlockAsync(duration)
        }, true)
    }

    // TODO check for cancelled here and in task scheduler
    fun delayTaskBlockAsync(duration: Long): Deferred<TaskResult> {
        val result = CompletableDeferred<TaskResult>()
        val timer = Timer()
        timer.schedule(object: TimerTask() {
            override fun run() {
                result.complete(Success(1))
            }

        }, duration)
        return result
    }
}