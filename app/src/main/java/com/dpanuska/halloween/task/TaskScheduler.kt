package com.dpanuska.halloween.task

import kotlinx.coroutines.*
import java.lang.Exception
import java.util.concurrent.ConcurrentLinkedQueue
import kotlin.coroutines.CoroutineContext

class TaskScope(disatcher: CoroutineDispatcher = Dispatchers.Default) : CoroutineScope {

    private var job: Job = Job()
    private var dispatch = disatcher

    override val coroutineContext: CoroutineContext
        get() = job + dispatch
}

// TODO should actually queue and not just execute
// TODO noting here too.. I hate this result shit.. FIXME
class TaskScheduler(disatcher: CoroutineDispatcher) {
    private val taskScope = TaskScope(disatcher)
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
                            println("TaskScheduler task completed successfully with result" + (result as Success).value)
                        } else {
                            println("TaskScheduler task failed with exception message" + (result as Failure).reason)
                        }
                    } catch (e: Exception) {
                        println("TaskScheduler task threw exception with message " + e.message)
                    } finally {
                        currentJob = null
                        executeTasks()
                    }
                }
            }
        }
    }
}