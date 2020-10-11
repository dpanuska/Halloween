package com.dpanuska.halloween.service.visual

import android.content.Context
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.media.Image

import android.view.View
import android.widget.ImageView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.constraintlayout.widget.ConstraintSet

class VisualService {

    lateinit var layout: ConstraintLayout
    lateinit var view: View
    lateinit var imageView: ImageView

    fun start(context: Context, overlayLayout: ConstraintLayout) {
        layout = overlayLayout

        view = View(context)
        view.background = ColorDrawable(Color.BLACK)
        view.id = View.generateViewId()
        imageView = ImageView(context)
        imageView.id = View.generateViewId()

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

    fun showBackgroundImage(resId: Int) {
        layout.visibility = View.VISIBLE

        imageView.setImageResource(resId)

    }

}