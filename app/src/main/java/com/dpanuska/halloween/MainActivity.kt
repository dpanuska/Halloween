package com.dpanuska.halloween

import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.dpanuska.halloween.permissions.PermissionHelper
import com.dpanuska.halloween.service.print.PrintService
import com.dpanuska.halloween.service.speech.SpeechService

class MainActivity : AppCompatActivity() {

    var printService: PrintService = PrintService()
    var speechService: SpeechService = SpeechService()
    lateinit var tts: TextToSpeech

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        PermissionHelper.checkAllPermissions(this)

        printService.start(this)
        speechService.start(this)


        // TODO check if bluetooth supported
        //startActivityForResult(Intent(this, ScanningActivity::class.java), ScanningActivity.SCANNING_FOR_PRINTER)

        val button = findViewById<Button>(R.id.button)
        button?.setOnClickListener() {
            speechService.sayText("hello world")
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        PermissionHelper.onRequestPermissionsResult(this, requestCode, permissions, grantResults)
    }
}