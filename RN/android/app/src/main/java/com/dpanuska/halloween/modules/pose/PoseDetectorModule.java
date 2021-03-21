package com.dpanuska.halloween.modules.pose;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;

import org.unimodules.core.ExportedModule;
import org.unimodules.core.ModuleRegistry;
import org.unimodules.core.Promise;
import org.unimodules.core.interfaces.ExpoMethod;
import org.unimodules.interfaces.facedetector.FaceDetectionError;
import org.unimodules.interfaces.facedetector.FaceDetector;
import org.unimodules.interfaces.facedetector.FaceDetectorProvider;
import org.unimodules.interfaces.facedetector.FacesDetectionCompleted;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class PoseDetectorModule extends ExportedModule {
    private static final String TAG = "PoseDetector";

    private ModuleRegistry mModuleRegistry;

    public PoseDetectorModule(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return TAG;
    }

    @ExpoMethod
    public void detectFaces(String filePath, HashMap<String, Object> options, final Promise promise) {
        FaceDetector detector = detectorForOptions(options, getContext());
        try {
            Uri uri =  Uri.parse(filePath);
            detector.detectFaces(uri, pose -> promise.resolve(pose), error -> promise.reject(error));
        } catch (IOException e) {
            promise.reject(e);
        }

    }

    private FaceDetector detectorForOptions(HashMap<String, Object> options, Context context) {
        FaceDetectorProvider faceDetectorProvider = mModuleRegistry.getModule(FaceDetectorProvider.class);

        FaceDetector faceDetector = faceDetectorProvider.createFaceDetectorWithContext(context);
        faceDetector.setSettings(options);

        return faceDetector;
    }

    @Override
    public void onCreate(ModuleRegistry moduleRegistry) {
        mModuleRegistry = moduleRegistry;
    }

    @Override
    public void onDestroy() {

    }
}
