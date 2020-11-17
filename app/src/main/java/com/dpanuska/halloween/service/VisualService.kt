package com.dpanuska.halloween.service

import android.content.Context
import android.graphics.Bitmap
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import com.bumptech.glide.Glide
import com.bumptech.glide.RequestManager
import com.dpanuska.halloween.R

object VisualService {

    lateinit var layout: ConstraintLayout
    lateinit var view: View
    lateinit var imageView: ImageView
    lateinit var textView: TextView

    lateinit var glide: RequestManager

    fun start(context: Context, overlayLayout: ConstraintLayout) {
        glide = Glide.with(context)
        layout = overlayLayout

        view = layout.getViewById(R.id.overlayBGView)
        imageView = layout.getViewById(R.id.overlayImageView) as ImageView
        textView = layout.getViewById(R.id.overlayTextView) as TextView

        hide()
    }

    fun shutDown() {

    }

    fun hide() {
        // TODO: Fix
        //layout.visibility = View.INVISIBLE
        //view.visibility = View.INVISIBLE
        imageView.visibility = View.INVISIBLE
        textView.visibility = View.INVISIBLE
    }

    fun show(showBG: Boolean = true, showImage: Boolean = true, showText: Boolean = true) {
        layout.visibility = View.VISIBLE

//        if (showBG) {
//            view.visibility = View.VISIBLE
//        }
        if (showImage) {
            imageView.visibility = View.VISIBLE
        }
        if (showText) {
            textView.visibility = View.VISIBLE
        }
    }

    fun setText(text: String) {
        show(false, false, true)
        textView.text = text
    }

    fun showBackgroundImage(resId: Int) {
        show(true, true, false)
        glide.load(resId).into(imageView)
    }

    fun showBackgroundImage(bitmap: Bitmap) {
        show(true, true, false)
        glide.load(bitmap).into(imageView)
    }

    fun showBackgroundGif(resId: Int) {
        show(true, true, false)
        glide.load(resId).into(imageView)
    }

}