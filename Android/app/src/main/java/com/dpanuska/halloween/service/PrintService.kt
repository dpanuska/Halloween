package com.dpanuska.halloween.service

import android.content.Context
import java.io.File

/**
 * Service used to Print images
 * TODO unused - see Bluetooth service
 */
object PrintService {

    val bluetooth = BluetoothService()

    /**
     * Start the service
     */
    fun start(context: Context) {
        bluetooth.start()
    }

    /**
     * Print a file - TODO not working
     */
    fun printImageFile(file: File) {
        bluetooth.sendFile(file)
    }
}