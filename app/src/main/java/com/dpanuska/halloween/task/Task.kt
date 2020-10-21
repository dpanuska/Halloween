package com.dpanuska.halloween.task

import kotlinx.coroutines.*
import java.lang.Exception

typealias TaskBlock = (Any?) -> Deferred<TaskResult>

// TODO Should throw / handle exception for task failure
open class BaseTask(taskBlock: TaskBlock?, dispatch: CoroutineDispatcher = Dispatchers.Main, suspend: Boolean = false, name: String? = null): Cloneable {

    val executionBlock = taskBlock
    val dispatcher = dispatch
    var taskName = name
    var waitForCompletion = suspend
    var completionHandler: ((TaskResult) -> Unit)? = null

    open suspend fun executeAsync(previousResult: Any? = null): Deferred<TaskResult> {
        if (executionBlock == null) {
            throw Exception("Task has no execution block!!!")
        }
        val result = executionBlock!!(previousResult)
        if (completionHandler != null) {
            completionHandler!!(result.await())
        }
        return result
    }

    open fun cancel() {
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
    var jobs = ArrayList<Job>()

     override suspend fun executeAsync(previousResult: Any?): Deferred<TaskResult> = coroutineScope {
         val deferred = CompletableDeferred<TaskResult>()

         var prevResult = previousResult
         for(i in 0 until taskList.size) {
             val task = taskList[i]
             val job = CoroutineScope(task.dispatcher).async {
                 val result = task.executeAsync(prevResult)
                 if (task.waitForCompletion) {
                     prevResult = result.await() ?: prevResult
                 }
             }

             jobs.add(job)
             if (task.waitForCompletion) {
                 job.await()
             }
         }

         if (completionHandler != null) {
             completionHandler!!(prevResult)
         }
         deferred.complete(prevResult)
         deferred
    }

    override fun cancel() {
        for (job in jobs) {
            job.cancel()
        }
    }

    override fun clone(): Any {
        val clone = super<BaseTask>.clone() as TaskList
        val clonedTasks = clone.taskList.map { task -> task.clone() } as List<BaseTask>
        clone.taskList = ArrayList(clonedTasks)
        return clone
    }
}