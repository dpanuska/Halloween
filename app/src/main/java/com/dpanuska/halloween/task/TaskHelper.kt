package com.dpanuska.halloween.task

import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred


object TaskHelper {
    fun syncSuccessResultAsync(): Deferred<TaskResult> {
        val result =  CompletableDeferred<TaskResult>()
        result.complete(Success(1))
        return result
    }
}