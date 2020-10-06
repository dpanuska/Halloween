package com.dpanuska.halloween.task

import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope

typealias TaskBlock = () -> Deferred<TaskResult>


open class BaseTask(taskBlock: TaskBlock, suspend: Boolean = false) {

    val executionBlock = taskBlock
    val waitForCompletion = suspend
    var job: Deferred<TaskResult>? = null

    open suspend fun execute(): TaskResult = coroutineScope {
//        job = async {
//            executionBlock()
//        }
        job = executionBlock()

        if (waitForCompletion) {
            job?.await()
        }

        Success(1)
    }

    open fun cancel() {
        job?.cancel()
    }
}

fun completeBlockAsync(): Deferred<TaskResult> {
    val result = CompletableDeferred<TaskResult>()
    result.complete(Success(1))
    return result
}

class TaskList(tasks: ArrayList<BaseTask>): BaseTask({ completeBlockAsync() }) {

    var taskList = tasks;
    var jobs = ArrayList<Deferred<TaskResult>>()

     override suspend fun execute(): TaskResult = coroutineScope {

         for(task in taskList) {
             val job = async {
                 task.execute()
             }

             jobs.add(job)

             if (task.waitForCompletion) {
                 job.await()
             }
         }

         Success(1)
    }

    override fun cancel() {
        for (job in jobs) {
            job.cancel()
        }
    }
}