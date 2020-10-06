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
            val taskList = ArrayList<BaseTask>()
            val task = SpeechTask.createSayTextTask(speechService, "hello world", true)
            val task2 = BaseTask(
                SpeechTask.sayTextTaskBlock(speechService, "I' waited!"), false
            )
            taskList.add(task)
            taskList.add(task2)
            val parentTask = TaskList(taskList)

            scheduler.queueTask(parentTask)
        }
    }

    // TODO start and shutDown on Camera movement detection for voice etc service

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        PermissionHelper.onRequestPermissionsResult(this, requestCode, permissions, grantResults)
    }
}