package com.dpanuska.halloween.task

import android.util.Log
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import java.util.*


object TaskHelper {

    val dispatcher = Dispatchers.Default
    const val TAG = "TaskHelper"

    fun syncSuccessResultAsync(result: Any? = null): Deferred<TaskResult> {
        val deferred =  CompletableDeferred<TaskResult>()
        deferred.complete(result)
        return deferred
    }

    fun createDelayTask(duration: Long): BaseTask {
        return BaseTask({
            delayTaskBlockAsync(duration)
        }, dispatcher,true)
    }

    // TODO check for cancelled here and in task scheduler
    private fun delayTaskBlockAsync(duration: Long): Deferred<TaskResult> {
        Log.e(TAG, "Starting Delay task")
        val result = CompletableDeferred<TaskResult>()
        val timer = Timer()
        timer.schedule(object: TimerTask() {
            override fun run() {
                result.complete(null)
            }

        }, duration)
        return result
    }
}