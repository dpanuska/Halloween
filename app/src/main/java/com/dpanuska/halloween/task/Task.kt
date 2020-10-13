package com.dpanuska.halloween.task

import kotlinx.coroutines.*

typealias TaskBlock = () -> Deferred<TaskResult>

// TODO Should throw / handle exception for task failure
open class BaseTask(taskBlock: TaskBlock?, dispatch: CoroutineDispatcher = Dispatchers.Main, suspend: Boolean = false, name: String? = null): Cloneable {

    val executionBlock = taskBlock
    val dispatcher = dispatch
    var taskName = name
    var waitForCompletion = suspend
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

class TaskList(
    tasks: ArrayList<BaseTask>,
    dispatch: CoroutineDispatcher = Dispatchers.Default,
    suspend: Boolean = false,
    name: String? = null): BaseTask(null, dispatch, suspend, name), Cloneable {

    var taskList = tasks;
    var jobs = ArrayList<Deferred<TaskResult>>()

     override suspend fun execute(): TaskResult = coroutineScope {

         for(task in taskList) {
             val job = CoroutineScope(task.dispatcher).async {
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
        val clone = super<BaseTask>.clone() as TaskList
        val clonedTasks = clone.taskList.map { task -> task.clone() } as List<BaseTask>
        clone.taskList = ArrayList(clonedTasks)
        return clone
    }
}