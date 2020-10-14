package com.dpanuska.halloween.task

import java.lang.Exception
//
//sealed class Result<out Success, out Failure>
//
//data class Success<out Success>(val value: Success) : Result<Success, Nothing>()
//data class Failure<out Failure>(val reason: Failure) : Result<Nothing, Failure>()

// TODO I hate this
typealias TaskResult = Any?
