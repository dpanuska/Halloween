package com.dpanuska.halloween.task

import android.util.Log
import kotlinx.coroutines.*
import java.lang.Exception
import java.util.concurrent.ConcurrentLinkedQueue
import kotlin.coroutines.CoroutineContext

class TaskScope(dispatcher: CoroutineDispatcher = Dispatchers.Default) : CoroutineScope {

    private var job: Job = Job()
    private var dispatch = dispatcher

    override val coroutineContext: CoroutineContext
        get() = job + dispatch
}

// TODO should actually queue and not just execute
// TODO noting here too.. I hate this result shit.. FIXME
class TaskScheduler(dispatcher: CoroutineDispatcher) {
    private val taskScope = TaskScope(dispatcher)
    private var currentJob: Job? = null // TODO atomic and/or list of active jobs?
    private val queue = ConcurrentLinkedQueue<BaseTask>()

    fun queueTask(task: BaseTask, clearOtherTasks: Boolean = false) {
        if (clearOtherTasks) {
            cancelAll()
        }
        queue.add(task)
        executeTasks()
    }

    fun cancelAll() {
        queue.clear()
        if (currentJob != null) {
            currentJob!!.cancel()
        }
    }

    private fun executeTasks() {
        if (currentJob == null || !currentJob!!.isActive) {
            val task = queue.poll()
            if (task != null) {
                currentJob = taskScope.launch {
                    try {
                        val result = task.execute()
                        if (result is Success) {
                            Log.e(TAG,  "task ${task.taskName} completed successfully with result ${ (result as Success).value}")
                        } else {
                            Log.e(TAG, "task ${task.taskName} failed with reason ${(result as Failure).reason}")
                        }
                    } catch (e: Exception) {
                        Log.e(TAG, "task ${task.taskName} threw exception", e)
                    } finally {
                        currentJob = null
                        executeTasks()
                    }
                }
            }
        }
    }

    companion object {
        private const val TAG = "TaskScheduler"
    }
}