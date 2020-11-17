package com.dpanuska.halloween.service

import android.content.Context
import android.graphics.Bitmap
import com.dpanuska.halloween.R
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.*

object FileService {

    private const val SAVE_WIDTH = 900
    private const val SAVE_HEIGHT = 600

    private const val FILENAME_FORMAT = "yyyy-MM-dd-HH-mm-ss-SSS"
    lateinit var outputDirectory: File
    var lastSavedFile: File? = null

    fun start(context: Context) {
        val mediaDir = context.externalMediaDirs.firstOrNull()?.let {
            File(it, context.resources.getString(R.string.app_name)).apply { mkdirs() } }
        outputDirectory = if (mediaDir != null && mediaDir.exists())
            mediaDir else context.filesDir
    }

    fun shutDown() {

    }

    fun saveBitmap(bitmap: Bitmap) {
        val photoFile = File(
            outputDirectory,
            SimpleDateFormat(
                FILENAME_FORMAT, Locale.US
            ).format(System.currentTimeMillis()) + ".jpg"
        )

        val fOut = FileOutputStream(photoFile)
        //val new = bitmap.scale(SAVE_WIDTH, SAVE_HEIGHT)
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fOut)
        fOut.flush()
        fOut.close()

        lastSavedFile = photoFile
    }

}