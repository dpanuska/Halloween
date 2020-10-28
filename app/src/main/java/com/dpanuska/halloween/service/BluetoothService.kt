package com.dpanuska.halloween.service

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothSocket
import android.util.Log
import java.io.File
import java.io.FileInputStream
import java.io.IOException
import java.util.*


class BluetoothService {

    var adapter: BluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
    private var connectThread: ConnectThread? = null

    fun start() {
        val device = adapter.getRemoteDevice(PRINTER_ADDRESS)
        connectThread = ConnectThread(device)
        connectThread?.run()
    }

    fun shutDown() {
        connectThread?.cancel()
    }

    fun sendFile(file: File) {

        val input = FileInputStream(file)
        var buffer = ByteArray(file.length().toInt())

        var readCount = input.read(buffer)
        while (readCount != -1) {
            connectThread?.writeBytes(buffer)
            readCount = input.read(buffer)
        }
    }

    private inner class ConnectThread(device: BluetoothDevice) : Thread() {

        private val mmSocket: BluetoothSocket? by lazy(LazyThreadSafetyMode.NONE) {
            device.createRfcommSocketToServiceRecord(device.uuids[1].uuid)
        }

        public override fun run() {
            // Cancel discovery because it otherwise slows down the connection.
            adapter?.cancelDiscovery()

            mmSocket?.connect()
        }

        // Closes the client socket and causes the thread to finish.
        fun cancel() {
            try {
                mmSocket?.close()
            } catch (e: IOException) {
                Log.e(TAG, "Could not close the client socket", e)
            }
        }

        fun writeBytes(byteArray: ByteArray) {
            mmSocket?.outputStream?.write(byteArray)
        }
    }

    companion object {
        const val TAG = "BluetoothService"
        const val PRINTER_ADDRESS = "88:57:1D:14:19:EE"
        const val BUFFER_SIZE = 1024
    }

}