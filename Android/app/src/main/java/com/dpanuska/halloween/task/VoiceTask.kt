package com.dpanuska.halloween.task

import com.dpanuska.halloween.service.VoiceRecognitionService
import kotlinx.coroutines.Deferred

/**
 * Helper to create voice recognition tasks
 * TODO This would be much more useful if set recognition tasks could have baked in subtasks based on recognized words
 */
object VoiceTask {

    // region Start recognition
    /**
     * Create a task to start voice recognition
     */
    fun createSetRecognitionTask(type: VoiceRecognitionService.RecognitionType): BaseTask {
        return BaseTask(setRecognitionBlock(type))
    }

    /**
     * Create task execution block for start recognition task
     */
    private fun setRecognitionBlock(type: VoiceRecognitionService.RecognitionType): TaskBlock {
        return {
            setRecognitionBlockAsync(type)
        }
    }

    /**
     * Create async result for start recognition task execution block
     */
    private fun setRecognitionBlockAsync(type: VoiceRecognitionService.RecognitionType): Deferred<TaskResult> {
        VoiceRecognitionService.setRecognitionType(type)
        return TaskHelper.syncSuccessResultAsync()
    }
    // endregion

    // region Stop recognition
    /**
     * Create task to stop voice recognition
     */
    fun createStopRecognitionTask(): BaseTask {
        return BaseTask(stopRecognitionBlock())
    }

    /**
     * Create task execution block for stop recognition task
     */
    private fun stopRecognitionBlock(): TaskBlock {
        return {
            stopRecognitionBlockAsync()
        }
    }

    /**
     * Create async result for stop recognition task execution block
     */
    private fun stopRecognitionBlockAsync(): Deferred<TaskResult> {
        VoiceRecognitionService.stopListening()
        return TaskHelper.syncSuccessResultAsync()
    }
    // endregion
}