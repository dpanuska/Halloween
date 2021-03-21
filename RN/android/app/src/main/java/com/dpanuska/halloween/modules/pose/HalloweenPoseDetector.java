package com.dpanuska.halloween.modules.pose;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;

import org.unimodules.interfaces.facedetector.FaceDetectionError;
import org.unimodules.interfaces.facedetector.FaceDetectionSkipped;
import org.unimodules.interfaces.facedetector.FaceDetector;
import org.unimodules.interfaces.facedetector.FacesDetectionCompleted;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.pose.Pose;
import com.google.mlkit.vision.pose.PoseDetection;
import com.google.mlkit.vision.pose.PoseDetector;
import com.google.mlkit.vision.pose.PoseDetectorOptionsBase;
import com.google.mlkit.vision.pose.defaults.PoseDetectorOptions;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class HalloweenPoseDetector implements FaceDetector {
    private static final String DETECT_LANDMARKS_KEY = "detectLandmarks";
    private static final String MIN_INTERVAL_MILLIS_KEY = "minDetectionInterval";

    private static final String POSE_DETECTED_KEY = "poseDetected";

    private Context mContext;
    private Task<Pose> mCurrentTask;
    private PoseDetector mPoseDetector = null;
    private boolean mLandmarkType = false;
    private long mMinDetectionInterval = 0;
    private long lastDetectionMillis = 0;

    public HalloweenPoseDetector(Context context) {
        mContext = context;
    }

    @Override
    public void detectFaces(Uri filePath,
                            FacesDetectionCompleted completed,
                            FaceDetectionError failed) throws IOException {
        createPoseDetector();

        try {
            InputImage image = InputImage.fromFilePath(mContext, filePath);
            processImageData(image, completed, failed, null);
        } catch (IOException e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public void detectFaces(byte[] imageData,
                            int width,
                            int height,
                            int rotation,
                            boolean mirrored,
                            double scaleX,
                            double scaleY,
                            FacesDetectionCompleted completed,
                            FaceDetectionError failed,
                            FaceDetectionSkipped skipped) {
        createPoseDetector();

        InputImage image = InputImage.fromByteArray(
                imageData,
                width,
                height,
                rotation,
                InputImage.IMAGE_FORMAT_NV21 // or IMAGE_FORMAT_YV12
        );

        processImageData(image, completed, failed, skipped);

    }

    @Override
    public void setSettings(Map<String, Object> settings) {
        if (settings.get(DETECT_LANDMARKS_KEY) instanceof Boolean) {
            setLandmarkType(((Boolean) settings.get(DETECT_LANDMARKS_KEY)).booleanValue());
        }

        if (settings.get(MIN_INTERVAL_MILLIS_KEY) instanceof Number) {
            setMinIntervalMillis(((Number) settings.get(MIN_INTERVAL_MILLIS_KEY)).intValue());
        } else {
            setMinIntervalMillis(0);
        }
    }

    private void setLandmarkType(boolean landmarkType) {
        if (landmarkType != mLandmarkType) {
            mLandmarkType = landmarkType;
        }
    }

    private void setMinIntervalMillis(long intValue) {
        mMinDetectionInterval = intValue;
    }

    @Override
    public void release() {
        releasePoseDetector();
    }

    private void processImageData(InputImage image,
                                  FacesDetectionCompleted completed,
                                  FaceDetectionError failed,
                                  FaceDetectionSkipped skipped) {

        // If caller provides skipped callback we will skip if processing another image
        if (skipped != null) {
            if (mCurrentTask != null) {
                skipped.onSkipped("Already Processing");
                return;
            } else if (mMinDetectionInterval <= 0 || !minIntervalPassed()) {
                skipped.onSkipped("Minimum detection interval has not passed");
                return;
            }
        }

        Task<Pose> poseTask = mPoseDetector.process(image)
                .addOnSuccessListener(
                        new OnSuccessListener<Pose>() {
                            @Override
                            public void onSuccess(Pose pose) {
                                // Task completed successfully
                                mCurrentTask = null;
                                Bundle bundle = new Bundle();
                                boolean poseDetected = !pose.getAllPoseLandmarks().isEmpty();
                                bundle.putBoolean(POSE_DETECTED_KEY, poseDetected);
                                if (mLandmarkType) {
                                    // TODO: serialize pose values
                                }
                                ArrayList<Bundle> poseArray = new ArrayList<>(List.of(bundle));
                                completed.detectionCompleted(poseArray);
                            }
                        })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                mCurrentTask = null;
                                // Task failed with an exception
                                failed.onError(e);
                            }
                        });
        // If this is a skippable task, keep track of it to cancel following requests (Real-Time detection)
        if (skipped != null) {
            mCurrentTask = poseTask;
            lastDetectionMillis = System.currentTimeMillis();
        }
    }

    private boolean minIntervalPassed() {
        return (lastDetectionMillis + mMinDetectionInterval) < System.currentTimeMillis();
    }

    private void createPoseDetector() {
        if (mPoseDetector == null) {
            PoseDetectorOptions options = new PoseDetectorOptions.Builder()
                    .setDetectorMode(PoseDetectorOptions.STREAM_MODE)
                    .build();
            mPoseDetector = PoseDetection.getClient(options);
        }
    }

    private void releasePoseDetector() {
        if (mPoseDetector != null) {
            mPoseDetector = null;
        }
    }
}
