package com.dpanuska.halloween

import android.util.Log
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import com.dpanuska.halloween.task.SpeechTask
import java.nio.ByteBuffer
import java.util.*
import kotlin.math.abs

typealias LumaListener = (luma: Double) -> Unit

interface LuminosityCallbackHandler {
    open fun onLuminosityChange(averageLuminosity: Double, currentLuminosity: Double)
    open fun onLuminosityNormal(averageLuminosity: Double)
}

class LuminosityListener(handler: LuminosityCallbackHandler) {

    var luminStartDate: Date? = null
    var averageLuminosity: Double = 0.0
    var luminCallbackCount: Int = 0
    lateinit var analyzer: LuminosityAnalyzer

    val changeHandler = handler

    init {
        analyzer = LuminosityAnalyzer {
            handleLuminosityChange(it)
        }
    }

    private fun handleLuminosityChange(luminosity: Double) {
        // TODO better initial value
        if (luminStartDate == null) {
            luminStartDate = Date()
            luminCallbackCount++
            averageLuminosity = luminosity
        } else if (Date().time - luminStartDate!!.time < LUMINOSITY_INIT_TIME) {
            luminCallbackCount++
            averageLuminosity = luminosity
        } else {
            val diff = luminosity - averageLuminosity!!

            if (abs(diff) > MINIMUM_LUMINOSITY_DIFF) {
                changeHandler.onLuminosityChange(averageLuminosity!!, luminosity)
            } else {
                averageLuminosity = averageLuminosity!! + diff * LUMINOSITY_SCALAR
                changeHandler.onLuminosityNormal(averageLuminosity)
            }
        }
    }

    companion object {
        private const val LUMINOSITY_SCALAR = 1 / 100.0
        private const val MINIMUM_LUMINOSITY_DIFF = 16
        private const val LUMINOSITY_INIT_TIME = 1.0 * 1000
    }

}

class LuminosityAnalyzer(private val listener: LumaListener) : ImageAnalysis.Analyzer {

    private fun ByteBuffer.toByteArray(): ByteArray {
        rewind()    // Rewind the buffer to zero
        val data = ByteArray(remaining())
        get(data)   // Copy the buffer into a byte array
        return data // Return the byte array
    }

    override fun analyze(image: ImageProxy) {
        val buffer = image.planes[0].buffer
        val data = buffer.toByteArray()
        val pixels = data.map { it.toInt() and 0xFF }
        val luma = pixels.average()

        listener(luma)

        image.close()
    }
}