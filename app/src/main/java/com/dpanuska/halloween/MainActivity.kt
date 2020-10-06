package com.dpanuska.halloween

import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.dpanuska.halloween.permissions.PermissionHelper
import com.dpanuska.halloween.service.print.PrintService
import com.dpanuska.halloween.service.speech.SpeechService
import com.dpanuska.halloween.service.voice.VoiceRecognitionService
import com.dpanuska.halloween.task.*

class MainActivity : AppCompatActivity() {

    var printService: PrintService = PrintService()
    var speechService: SpeechService = SpeechService()
    var voiceService = VoiceRecognitionService()
    var scheduler = TaskScheduler()
    lateinit var tts: TextToSpeech

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        PermissionHelper.checkAllPermissions(this)

        printService.start(this)
        speechService.start(this)
        voiceService.start(this)


        // TODO check if bluetooth supported
        //startActivityForResult(Intent(this, ScanningActivity::class.java), ScanningActivity.SCANNING_FOR_PRINTER)

        val button = findViewById<Button>(R.id.button)
        button?.setOnClickListener() {

            val tasks = arrayListOf<BaseTask>(
                SpeechTask.createSayTextTask(speechService, "3"),
                SpeechTask.createSayTextTask(speechService, "2"),
                SpeechTask.createSayTextTask(speechService, "1"),
                SpeechTask.createSayTextTask(speechService, "1", 1.0f, 1.5f),
                SpeechTask.createSayTextTask(speechService, "1", 2.0f, 2.0f),
                SpeechTask.createSayTextTask(speechService, "1", 3.0f, 3.0f),
                SpeechTask.createSayTextTask(speechService, "1", 4.0f, 3.0f),
                SpeechTask.createSayTextTask(speechService, "1"),
                SpeechTask.createSayTextTask(speechService, "1"),

                SpeechTask.createSayTextTask(speechService, "   Ahem", 1.0f, 0.6f),
                SpeechTask.createResetDefaultsTask(speechService),
                SpeechTask.createSayTextTask(speechService, "Sorry about that, there must be something wrong with my programming"),

            )
            val parentTask = TaskList(tasks)

            scheduler.queueTask(parentTask)

            val newTask = SpeechTask.createSayTextTask(speechService, "Hey, I started a second task!")
            scheduler.queueTask(newTask)
        }
    }

    // TODO start and shutDown on Camera movement detection for voice etc service

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        PermissionHelper.onRequestPermissionsResult(this, requestCode, permissions, grantResults)
    }
}