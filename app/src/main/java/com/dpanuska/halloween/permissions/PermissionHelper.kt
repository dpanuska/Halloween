package com.dpanuska.halloween.permissions

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.provider.Settings
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat


object PermissionHelper {

    enum class PermissionKey(val value: Int) {
        Camera(0),
        Record(1),
        Bluetooth(2);

        companion object {
            fun fromInt(value: Int) = PermissionKey.values().firstOrNull() { it.value == value }
        }
    }

    // Map Keys to manifest permissions
    private val permissionKeys = mapOf(PermissionKey.Camera to Manifest.permission.CAMERA,
        PermissionKey.Record to Manifest.permission.RECORD_AUDIO,
        PermissionKey.Bluetooth to Manifest.permission.BLUETOOTH)

    private fun hasPermission(context: Context, key: PermissionKey): Boolean {
        return ContextCompat.checkSelfPermission(context,
            permissionKeys[key] ?: error("CameraPermission not defined")
        ) == PackageManager.PERMISSION_GRANTED
    }

    private fun requestPermission(activity: Activity, key: PermissionKey) {
        ActivityCompat.requestPermissions(activity, arrayOf(permissionKeys[key]), key.ordinal)
    }

    private fun shouldShowRequestPermissionRationale(activity: Activity, key: PermissionKey): Boolean {
        return ActivityCompat.shouldShowRequestPermissionRationale(activity, permissionKeys[key] ?: error(""))
    }


    // Camera
    fun hasCameraPermission(context: Context): Boolean {
        return hasPermission(context, PermissionKey.Camera)
    }

    private fun requestCameraPermission(activity: Activity) {
        requestPermission(activity, PermissionKey.Camera)
    }


    // Record Audio
    fun hasRecordPermission(context: Context): Boolean {
        return hasPermission(context, PermissionKey.Record)
    }

    private fun requestRecordPermission(activity: Activity) {
        requestPermission(activity, PermissionKey.Record)
    }

    // Bluetooth

    fun hasBluetoothPermission(context: Context): Boolean {
        return hasPermission(context, PermissionKey.Bluetooth)
    }

    private fun requestBluetoothPermission(activity: Activity) {
        requestPermission(activity, PermissionKey.Bluetooth)
    }


    // General
    fun checkAllPermissions(activity: Activity) {
        if (!hasCameraPermission(activity)) {
            requestCameraPermission(activity)
        }
        if (!hasRecordPermission(activity)) {
            requestRecordPermission(activity)
        }
        if (!hasBluetoothPermission(activity)) {
            requestBluetoothPermission(activity)
        }
    }

    // Good Enough for this app - should do more checking around termination
    fun onRequestPermissionsResult(activity: Activity, requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        val permission = PermissionKey.fromInt(requestCode)
        if (permission != null) {
            if (!hasPermission(activity, permission)) {
                Toast.makeText(activity, "permission is needed to run this application", Toast.LENGTH_LONG)
                    .show()
                if (!shouldShowRequestPermissionRationale(activity, permission)) {
                    // Permission denied with checking "Do not ask again".
                    launchPermissionSettings(activity)
                }
                activity.finish()
            }

            activity.recreate()
        }
    }

    private fun launchPermissionSettings(activity: Activity) {
        val intent = Intent()
        intent.action = Settings.ACTION_APPLICATION_DETAILS_SETTINGS
        intent.data = Uri.fromParts("package", activity.packageName, null)
        activity.startActivity(intent)
    }
}