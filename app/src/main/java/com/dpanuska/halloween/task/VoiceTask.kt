package com.dpanuska.halloween.task

import com.dpanuska.halloween.service.VoiceRecognitionService
import kotlinx.coroutines.Deferred

object VoiceTask {

    fun createSetRecognitionTask(type: VoiceRecognitionService.RecognitionType): BaseTask {
        return BaseTask(setRecognitionBlock(type))
    }

    fun setRecognitionBlock(type: VoiceRecognitionService.RecognitionType): TaskBlock {
        return {
            setRecognitionBlockAsync(type)
        }
    }

    fun setRecognitionBlockAsync(type: VoiceRecognitionService.RecognitionType): Deferred<TaskResult> {
        VoiceRecognitionService.setRecognitionType(type)
        return TaskHelper.syncSuccessResultAsync()
    }

    fun createStopRecognitionTask(): BaseTask {
        return BaseTask(stopRecognitionBlock())
    }

    fun stopRecognitionBlock(): TaskBlock {
        return {
            stopRecognitionBlockAsync()
        }
    }

    fun stopRecognitionBlockAsync(): Deferred<TaskResult> {
        VoiceRecognitionService.stopListening()
        return TaskHelper.syncSuccessResultAsync()
    }

}