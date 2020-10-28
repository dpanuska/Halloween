package com.dpanuska.halloween.service

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.core.content.ContextCompat.startActivity
import java.io.File


object PrintService {

    val bluetooth = BluetoothService()

    fun start(context: Context) {
        bluetooth.start()
    }


    fun printImageFile(file: File) {
        bluetooth.sendFile(file)
    }
}