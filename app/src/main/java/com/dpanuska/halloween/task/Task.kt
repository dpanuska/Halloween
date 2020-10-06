package com.dpanuska.halloween.task

import kotlinx.coroutines.*

typealias TaskBlock = () -> Deferred<TaskResult>

// TODO Should throw / handle exception for task failure
open class BaseTask(taskBlock: TaskBlock?, suspend: Boolean = false) {

    val executionBlock = taskBlock
    val waitForCompletion = suspend
    var job: Deferred<TaskResult>? = null

    open suspend fun execute(): TaskResult = coroutineScope {
        if (executionBlock != null) {
            job = executionBlock!!()

            if (waitForCompletion) {
                job?.await()
            }
        }

        Success(1)
    }

    open fun cancel() {
        job?.cancel()
    }
}

class TaskList(tasks: ArrayList<BaseTask>, suspend: Boolean = false): BaseTask(null, suspend) {

    var taskList = tasks;
    var jobs = ArrayList<Deferred<TaskResult>>()

     override suspend fun execute(): TaskResult = coroutineScope {

         for(task in taskList) {
             val job = async {
                 task.execute()
             }

             jobs.add(job)
             if(task.waitForCompletion) {
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