package com.dpanuska.halloween.service.print

import android.content.Context
import android.graphics.Bitmap
import com.mazenrashed.printooth.Printooth
import com.mazenrashed.printooth.data.PrintingImagesHelper
import com.mazenrashed.printooth.data.printable.ImagePrintable
import com.mazenrashed.printooth.data.printable.Printable
import com.mazenrashed.printooth.data.printer.Printer

class PrintService {

    fun start(context: Context) {
        Printooth.init(context)
    }

    fun shutDown() {

    }

    fun printImage(image: Bitmap) {
        val printables = ArrayList<Printable>()
        val printable = ImagePrintable.Builder(image).build()
        printables.add(printable)
        Printooth.printer().print(printables)
    }
}

//Printooth.printer().printingCallback = object : PrintingCallback {
//    override fun connectingWithPrinter() { }
//
//    override fun printingOrderSentSuccessfully() { }  //printer was received your printing order successfully.
//
//    override fun connectionFailed(error: String) { }
//
//    override fun onError(error: String) { }
//
//    override fun onMessage(message: String) { }
//}

