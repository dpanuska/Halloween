package com.dpanuska.halloween.task

import kotlinx.coroutines.*
import java.lang.Exception

typealias TaskBlock = (Any?) -> Deferred<TaskResult>

/**
 * Base Task to execute via coroutine.  Task takes an execution block which must return an async result
 * This is clonable in order to store named and typed tasks which can be
 * @param taskBlock Block to execute which can take result of previous task and return a deferred result
 * @param dispatch CoroutineDispather to use for execution ex. Main, IO, Default, Custom
 * @param suspend If the task should wait for completion before continuing to other tasks
 * @param name Optional name for logging and use for linking tasks based on name
 *
 * TODO Should improve throw / handle exception for task failure
 * TODO Should be individually cancellable - TaskList is mainly used..
 */
open class BaseTask(taskBlock: TaskBlock?, dispatch: CoroutineDispatcher = Dispatchers.Main, suspend: Boolean = false, name: String? = null): Cloneable {

    val executionBlock = taskBlock
    val dispatcher = dispatch
    var taskName = name
    var waitForCompletion = suspend
    var completionHandler: ((TaskResult) -> Unit)? = null

    /**
     * Execute the logic block for the task
     */
    open suspend fun executeAsync(previousResult: Any? = null): Deferred<TaskResult> {
        if (executionBlock == null) {
            throw Exception("Task has no execution block!!!")
        }
        val result = executionBlock!!(previousResult)
        // If a completion block has been provided, notify once task is complete
        if (completionHandler != null) {
            completionHandler!!(result.await())
        }
        return result
    }

    /**
     * Cancel the task
     * TODO would be nice to support this here, but currently TaskList is main used type which does
     */
    open fun cancel() {
    }

    /**
     * Clone this task to make a new task with default state or use some special logic
     * (See named and typed tasks for example)
     */
    public override fun clone(): Any {
        return super.clone()
    }

}

/**
 * BaseTasks subclass which executes a list of related tasks. Tasks can wait for others or dispatch
 * concurrently based on dispatcher and setting provided
 * @param tasks List of related tasks which define a predefined overall task
 * @param dispatch CoroutineDispatcher see @BaseTask
 * @param suspend If the task list should wait for all subtasks to complete before returning result
 * @param name optional name for logging and use for linking tasks based on name
 */
class TaskList(
    tasks: ArrayList<BaseTask>,
    dispatch: CoroutineDispatcher = Dispatchers.Default,
    suspend: Boolean = false,
    name: String? = null): BaseTask(null, dispatch, suspend, name), Cloneable {

    var taskList = tasks;
    var jobs = ArrayList<Job>()

    /**
     * Execute all tasks in this task list.  Will wait to execute next tasks if suspend (waitForCompletion)
     * flag is set on the task.
     */
     override suspend fun executeAsync(previousResult: Any?): Deferred<TaskResult> = coroutineScope {
         val deferred = CompletableDeferred<TaskResult>()

         var prevResult = previousResult
         for(i in 0 until taskList.size) {
             val task = taskList[i]
             // Dispatch on provided Dispatcher
             val job = CoroutineScope(task.dispatcher).async {
                 val result = task.executeAsync(prevResult)
                 // If a task is marked as suspend, it can pass it's result to the next task assuming !null
                 if (task.waitForCompletion) {
                     prevResult = result.await() ?: prevResult
                 }
             }

             jobs.add(job)
             // If marked as suspending, wait for completion before moving on
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

    /**
     * Cancel the currently running job
     */
    override fun cancel() {
        for (job in jobs) {
            job.cancel()
        }
    }

    /**
     * Clone all subtasks. Used in order to handle special case tasks and reset state
     */
    override fun clone(): Any {
        val clone = super<BaseTask>.clone() as TaskList
        val clonedTasks = clone.taskList.map { task -> task.clone() } as List<BaseTask>
        clone.taskList = ArrayList(clonedTasks)
        return clone
    }
}