package com.dpanuska.halloween.service

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.media.Image

import android.view.View
import android.webkit.WebView
import android.widget.ImageView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.constraintlayout.widget.ConstraintSet
import com.bumptech.glide.Glide
import com.bumptech.glide.RequestManager

class VisualService {

    lateinit var layout: ConstraintLayout
    lateinit var view: View
    lateinit var imageView: ImageView

    lateinit var glide: RequestManager

    fun start(context: Context, overlayLayout: ConstraintLayout) {

        glide = Glide.with(context)
        layout = overlayLayout

        view = View(context)
        view.background = ColorDrawable(Color.BLACK)
        view.id = View.generateViewId()

        imageView = ImageView(context)
        imageView.id = View.generateViewId()
        //imageView.scaleType = ImageView.ScaleType.CENTER_CROP

        layout.addView(view)
        layout.addView(imageView)

        val set = ConstraintSet()
        set.clone(layout)
        set.applyTo(layout)

        hide()
    }

    fun shutDown() {

    }

    fun hide() {
        layout.visibility = View.INVISIBLE
    }

    fun show() {
        layout.visibility = View.VISIBLE
    }

    fun showBackgroundImage(resId: Int) {
        show()
        imageView.setImageResource(resId)
    }

    fun showBackgroundImage(bitmap: Bitmap) {
        show()
        imageView.setImageBitmap(bitmap)
    }

    fun showBackgroundGif(resId: Int) {
        show()
        glide.load(resId).into(imageView)
    }

}