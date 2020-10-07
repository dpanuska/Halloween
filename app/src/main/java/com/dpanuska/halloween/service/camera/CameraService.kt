package com.dpanuska.halloween.service.camera

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.ImageFormat
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraDevice
import android.hardware.camera2.CameraManager
import android.os.Handler
import com.dpanuska.halloween.permissions.PermissionHelper


class CameraService {

    @SuppressLint("MissingPermission")
    private fun start(context: Context) {
        if (!PermissionHelper.hasCameraPermission(context)) {
            return
        }
        //https://medium.com/@gauravpandey_34933/how-to-camera2-api-in-android-576fd23650ea
        // https://github.com/googlearchive/android-Camera2Basic/tree/master/kotlinApp/Application/src/main/java/com/example/android/camera2basic
        val cameraManager = context.getSystemService(Context.CAMERA_SERVICE) as CameraManager
        if (cameraManager.cameraIdList.isEmpty()) {
            // no cameras
            return
        }

        val firstCamera = cameraManager.cameraIdList[0]

        cameraManager.openCamera(firstCamera, object: CameraDevice.StateCallback() {
            override fun onDisconnected(p0: CameraDevice) { }
            override fun onError(p0: CameraDevice, p1: Int) { }

            override fun onOpened(cameraDevice: CameraDevice) {
                // use the camera
                val cameraCharacteristics = cameraManager.getCameraCharacteristics(cameraDevice.id)

                cameraCharacteristics[CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP]?.let { streamConfigurationMap ->
                    streamConfigurationMap.getOutputSizes(ImageFormat.YUV_420_888)?.let { yuvSizes ->
                        val previewSize = yuvSizes.last()

                    }

                }
            }
        }, Handler { true })
    }

    fun shutDown() {

    }


}
