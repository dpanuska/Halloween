package com.dpanuska.halloween.task

import kotlinx.coroutines.*

typealias TaskBlock = () -> Deferred<TaskResult>

// TODO Should throw / handle exception for task failure
open class BaseTask(taskBlock: TaskBlock?, suspend: Boolean = false, name: String? = null): Cloneable {

    val executionBlock = taskBlock
    var taskName = name
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

    public override fun clone(): Any {
        return super.clone()
    }

}

class TaskList(tasks: ArrayList<BaseTask>, suspend: Boolean = false, name: String? = null): BaseTask(null, suspend, name), Cloneable {

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

    public override fun clone(): Any {
        return super<BaseTask>.clone()
    }
}