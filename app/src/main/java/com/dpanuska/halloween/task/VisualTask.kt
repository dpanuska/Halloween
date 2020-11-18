package com.dpanuska.halloween.task

import android.graphics.Bitmap
import android.util.Log
import com.dpanuska.halloween.service.VisualService
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import java.lang.Exception

/**
 * Helper to create visual based tasks
 */
object VisualTask {

    private val dispatcher = Dispatchers.Main // Visuals need to be updated on main thread
    const val TAG = "VisualTask"

    // region Hide visuals
    /**
     * Create task to hide visuals
     */
    fun createHideOverlayTask(suspend: Boolean = false): BaseTask {
        return BaseTask(hideOverlayBlock(), dispatcher, suspend)
    }

    /**
     * Create execution block for a hide overlay task
     */
    private fun hideOverlayBlock(): TaskBlock {
        return {
            Log.e(TAG, "Starting Hide Overlay task")
            hideOverlayBlockAsync()
        }
    }

    /**
     * Create async result for hide overlay based task block
     */
    private fun hideOverlayBlockAsync(): Deferred<TaskResult> {
        VisualService.hide()
        return TaskHelper.syncSuccessResultAsync()
    }
    // endregion

    // region Resource background display
    /**
     * Create task to set a visual background image with the provided image resource
     */
    fun createSetBackgroundTask(resId: Int, suspend: Boolean = false): BaseTask {
        return BaseTask(setBackgroundBlock(resId), dispatcher, suspend)
    }

    /**
     * Create execution block for setting a background image task
     */
    private fun setBackgroundBlock(resId: Int): TaskBlock {
        return {
            Log.e(TAG, "Starting Set Image task")
            setBackgroundBlockAsync(resId)
        }
    }

    /**
     * Create an async result for a background image execution block
     */
    private fun setBackgroundBlockAsync(resId: Int): Deferred<TaskResult> {
        VisualService.showBackgroundImage(resId)
        return TaskHelper.syncSuccessResultAsync()
    }
    // endregion

    // region Bitmap background display
    /**
     * Create a task to set background image from Bitmap
     */
    fun createSetBackgroundTask(bitmap: Bitmap): BaseTask {
        return BaseTask(setBackgroundBlock(bitmap), dispatcher)
    }

    /**
     * Create task execution block for setting a Bitmap background.
     * This is used as a linked task so must be chained with a task returning a Bitmap result.
     */
    fun createSetBackgroundTask(suspend: Boolean = false): BaseTask {
        return BaseTask(setBackgroundBlock(), dispatcher, suspend)
    }

    /**
     * Create async result for Bitmap background task execution block.
     * This is used as a linked task so must be chained with a task returning a Bitmap result.
     */
    private fun setBackgroundBlock(): TaskBlock {
        return {
            val bitmap = it as? Bitmap ?: throw(Exception("Bitmap not passed to set background block"))
            Log.e(TAG, "Starting Set Image task")
            setBackgroundBlockAsync(bitmap)
        }
    }

    /**
     * Create async result for Bitmap background task execution block.
     */
    private fun setBackgroundBlock(bitmap: Bitmap): TaskBlock {
        return {
            Log.e(TAG, "Starting Set Image task")
            setBackgroundBlockAsync(bitmap)
        }
    }

    /**
     * Create async result for setting Bitmap image task execution block
     */
    private fun setBackgroundBlockAsync(bitmap: Bitmap): Deferred<TaskResult> {
        VisualService.showBackgroundImage(bitmap)
        return TaskHelper.syncSuccessResultAsync(bitmap)
    }
    // endregion

    // region Gif display
    /**
     * Create a task to display a gif from resource
     */
    fun createSetBackgroundGifTask(resId: Int, suspend: Boolean = false): BaseTask {
        return BaseTask(setBackgroundGifBlock(resId), dispatcher, suspend)
    }

    /**
     * Create task execution block to set background gif from resource
     */
    private fun setBackgroundGifBlock(resId: Int): TaskBlock {
        return {
            Log.e(TAG, "Starting Set GIF task")
            setBackgroundGifBlockAsync(resId)
        }
    }

    /**
     * Create async result for background gif task execution block
     */
    private fun setBackgroundGifBlockAsync(resId: Int): Deferred<TaskResult> {
        VisualService.showBackgroundGif(resId)
        return TaskHelper.syncSuccessResultAsync()
    }
    // endregion

    // region Text display
    /**
     * Create task to display text
     */
    fun createSetTextTask(text: String, suspend: Boolean = false): BaseTask {
        return BaseTask(setTextBlock(text), dispatcher, suspend)
    }

    /**
     * Create task execution block for task to set text
     */
    private fun setTextBlock(text: String): TaskBlock {
        return {
            Log.e(TAG, "Starting Set Text task")
            setTextBlockAsync(text)
        }
    }

    /**
     * Create async result for set text task execution block
     */
    private fun setTextBlockAsync(text: String): Deferred<TaskResult> {
        VisualService.setText(text)
        return TaskHelper.syncSuccessResultAsync()
    }
    // endregion
}