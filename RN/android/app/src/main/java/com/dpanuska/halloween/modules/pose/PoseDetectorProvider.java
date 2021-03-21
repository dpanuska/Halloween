package com.dpanuska.halloween.modules.pose;

import android.content.Context;

import org.unimodules.core.interfaces.InternalModule;
import org.unimodules.interfaces.facedetector.FaceDetector;
import org.unimodules.interfaces.facedetector.FaceDetectorProvider;

import java.util.Collections;
import java.util.List;

public class PoseDetectorProvider implements FaceDetectorProvider, InternalModule {
    @Override
    public List<Class> getExportedInterfaces() {
        return Collections.singletonList((Class) org.unimodules.interfaces.facedetector.FaceDetectorProvider.class);
    }

    @Override
    public FaceDetector createFaceDetectorWithContext(Context context) {
        return new HalloweenPoseDetector(context);
    }
}

