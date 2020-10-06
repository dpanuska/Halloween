package com.dpanuska.halloween.task

import android.content.Context
import androidx.work.*
import kotlinx.coroutines.*
import kotlin.coroutines.CoroutineContext

class MainScope : CoroutineScope {

    private var job: Job = Job()

    override val coroutineContext: CoroutineContext
        get() = job + Dispatchers.Main

    fun onCreate() {
        job = Job()
    }

    fun destroy() = job.cancel()
}

class TaskScheduler {
    private val mainScope = MainScope()

    fun queueTask(task: BaseTask) = mainScope.launch {
        task.execute()
    }

    fun cancelAll() {
        mainScope.destroy()
    }
}

class TaskWorker(context: Context, params: WorkerParameters, task: BaseTask): CoroutineWorker(context, params) {

    var task = task
    var jobs = ArrayList<Deferred<Result>>()
    override suspend fun doWork(): Result = withContext(Dispatchers.IO)  {
        val job = async {
            task.execute()
        }
        job.await()
        Result.success()
    }

   private suspend fun executeTask(tasks: ArrayList<BaseTask>): Result = withContext(Dispatchers.IO)  {
        for (task in tasks) {
            if (isActive) {
                if (task.waitForCompletion) {
                    val dispatch = async() {
                        task.execute()
                    }
                    dispatch.await()
                } else {
                    val job = async() {
                        task.execute()
                    }
                }
            }
        }
       Result.success()
    }

    private fun cancelTasks() {
        for (job in jobs) {
            job.cancel()
        }
    }

}

// Eample
// set Picture, say,
// say -> pitch -> say -> pitch

/*
TaskList<>
 */