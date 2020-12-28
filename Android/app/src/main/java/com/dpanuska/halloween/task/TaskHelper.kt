package com.dpanuska.halloween.task

import android.util.Log
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import java.util.*

/**
 * Helper to define commonly used task logic and generic task types
 */
object TaskHelper {

    private val dispatcher = Dispatchers.Default
    const val TAG = "TaskHelper"

    /**
     * Helper to return an immediately complete a deferred result.
     * Helpful for task logic blocks that complete immediately
     */
    fun syncSuccessResultAsync(result: Any? = null): Deferred<TaskResult> {
        val deferred =  CompletableDeferred<TaskResult>()
        deferred.complete(result)
        return deferred
    }

    // region Delay task
    /**
     * Create a delay task which will wait until complete before proceeding to subsequent tasks
     */
    fun createDelayTask(duration: Long): BaseTask {
        return BaseTask({
            delayTaskBlockAsync(duration)
        }, dispatcher,true)
    }

    /**
     * Create execution block for a delay task
     * TODO check for cancelled here and in task scheduler
     */
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
    //endregion
}