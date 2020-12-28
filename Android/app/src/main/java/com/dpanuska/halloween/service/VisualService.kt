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

/**
 * Service used to display visuals
 * TODO initialization expects a lot here..
 */
object VisualService {

    lateinit var layout: ConstraintLayout
    lateinit var view: View
    lateinit var imageView: ImageView
    lateinit var textView: TextView

    lateinit var glide: RequestManager

    /**
     * Start the service
     */
    fun start(context: Context, overlayLayout: ConstraintLayout) {
        glide = Glide.with(context)
        layout = overlayLayout

        view = layout.getViewById(R.id.overlayBGView)
        imageView = layout.getViewById(R.id.overlayImageView) as ImageView
        textView = layout.getViewById(R.id.overlayTextView) as TextView

        hide()
    }

    /**
     * Shut Down the Service
     */
    fun shutDown() {}

    /**
     * Hide Visuals
     */
    fun hide() {
        // TODO: Fix
        //layout.visibility = View.INVISIBLE
        //view.visibility = View.INVISIBLE
        imageView.visibility = View.INVISIBLE
        textView.visibility = View.INVISIBLE
    }

    /**
     * Show specific UI elements
     */
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

    /**
     * Display some text
     */
    fun setText(text: String) {
        show(false, false, true)
        textView.text = text
    }

    /**
     * Display an image from resource
     */
    fun showBackgroundImage(resId: Int) {
        show(true, true, false)
        glide.load(resId).into(imageView)
    }

    /**
     * Display an image from Bitmap
     */
    fun showBackgroundImage(bitmap: Bitmap) {
        show(true, true, false)
        glide.load(bitmap).into(imageView)
    }

    /**
     * Display a gif
     */
    fun showBackgroundGif(resId: Int) {
        show(true, true, false)
        glide.load(resId).into(imageView)
    }

}