package com.dpanuska.halloween.task

import android.util.Log
import kotlinx.coroutines.*
import java.lang.Exception
import java.util.concurrent.ConcurrentLinkedQueue
import kotlin.coroutines.CoroutineContext

/**
 * Custom CoroutineScope used by TaskScheduler so that all jobs are inherently linked for easy
 * cancellation.  Optionally provided a dispatcher to determine thread to be used to dispatch
 * tasks.
 */
class TaskScope(dispatcher: CoroutineDispatcher = Dispatchers.Default) : CoroutineScope {

    private var job: Job = Job()
    private var dispatch = dispatcher

    override val coroutineContext: CoroutineContext
        get() = job + dispatch
}

/**
 * Schedules BaseTasks for execution. Scheduled tasks are run in order and only one task is
 * dispatched at a time. Optionally provided a dispatcher to determine thread to be used to dispatch
 * tasks.
 */
class TaskScheduler(dispatcher: CoroutineDispatcher = Dispatchers.Default) {

    private val taskScope = TaskScope(dispatcher)
    private var currentJob: Job? = null // TODO atomic and/or list of active jobs?
    private val queue = ConcurrentLinkedQueue<BaseTask>()

    /**
     * Queues a task for dispatch. Optionally cancel the current tasks and all other queued tasks.
     */
    fun queueTask(task: BaseTask, clearOtherTasks: Boolean = false) {
        if (clearOtherTasks) {
            cancelAll()
        }
        queue.add(task)
        executeTasks()
    }

    /**
     * Cancels the current tasks and clears all queued tasks
     */
    fun cancelAll() {
        queue.clear()
        if (currentJob != null) {
            currentJob!!.cancel()
        }
    }

    /**
     * Executes queued tasks in order.
     */
    private fun executeTasks() {
        // Wait until no task is currently being dispatched
        if (currentJob == null || !currentJob!!.isActive) {
            val task = queue.poll()
            if (task != null) {
                // Dispatch on shared scope
                currentJob = taskScope.launch {
                    // Run actual task logic on dispatcher provided by the task
                    CoroutineScope(task.dispatcher).launch {
                        try {
                            val result = task.executeAsync().await()
                            Log.e(TAG,  "task $task completed successfully with result $result")
                        } catch (e: Exception) {
                            Log.e(TAG, "task $task threw exception", e)
                        } finally {
                            currentJob = null
                            executeTasks()
                        }
                    }
                }
            }
        }
    }

    companion object {
        private const val TAG = "TaskScheduler"
    }
}