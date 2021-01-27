package com.dpanuska.halloween.modules;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import edu.cmu.pocketsphinx.*;
import java.io.File;

import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Paths;
import java.util.Arrays;

import static android.content.Context.MODE_PRIVATE;


public class VoiceRecognitionModule extends ReactContextBaseJavaModule implements RecognitionListener {

    public static final String HYPOTHESIS_EVENT = "Hypothesis";
    public static final String STARTED_EVENT = "Started";
    public static final String STOPPED_EVENT = "Stopped";
    public static final String SPEECH_DETECTED_EVENT = "SpeechDetected";
    public static final String SPEECH_ENDED_EVENT = "SpeechEnded";
    public static final String SUSPENDED_EVENT = "Suspended";
    public static final String RESUMED_EVENT = "Resumed";

    public static final String NO_WORDS_ERROR = "NO_WORD_ERROR";
    public static final String ALREADY_LISTENING_ERROR = "ALREADY_LISTENING_ERROR";
    public static final String ALREADY_SUSPENDED_ERROR = "ALREADY_SUSPENDED_ERROR";
    public static final String NOT_LISTENING_ERROR = "NOT_LISTENING_ERROR";
    public static final String NOT_SUSPENDED_ERROR = "NOT_SUSPENDED_ERROR";

    public static final String MODEL_PATH = "recognitionModel";

    private SpeechRecognizer recognizer;
    private File modelDir;
    private File languageModelFile;
    private Boolean isSuspended = false;
    private Boolean isListening = false;
    private String lastHypothesis = "";

    // TODO perhaps an initialize call to reduce start up time
    VoiceRecognitionModule(ReactApplicationContext context) {
        super(context);
        try {
            Assets assets = new Assets(context);
            File assetDir = assets.syncAssets();
            recognizer = SpeechRecognizerSetup.defaultSetup()
                    .setAcousticModel(new File(assetDir, "en-us-ptm"))
                    .setDictionary(new File(assetDir, "cmudict-en-us.dict"))
                    .setKeywordThreshold(0.1f)
                    .getRecognizer();
            recognizer.addListener(this);

            modelDir = context.getFilesDir();
        } catch (IOException e) {
            e.printStackTrace();
        };
    }

    @NonNull
    @Override
    public String getName() {
        return "VoiceRecognition";
    }

    @ReactMethod
    public void setRecognitionWords(ReadableArray words, Promise promise) {

        try {
            languageModelFile = new File(modelDir, MODEL_PATH);
            languageModelFile.createNewFile();
            PrintStream writer = new PrintStream(languageModelFile);
            for(int i = 0; i < words.size(); ++i) {
                String word = words.getString(i);
                if (i == words.size() - 1) {
                    writer.print(word);
                } else {
                    writer.println(word);
                }
            }
            writer.flush();
            writer.close();

            recognizer.addKeywordSearch(MODEL_PATH, languageModelFile);

            promise.resolve(true);
        } catch (IOException e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void startListening(Promise promise) {
        if (languageModelFile == null) {
            promise.reject(NO_WORDS_ERROR, "Recognition no word dictionary has been set");
        } else if (isListening) {
            promise.reject(ALREADY_LISTENING_ERROR, "Recognition is already listening");
        } else {
            recognizer.startListening(MODEL_PATH);
            isListening = true;
            promise.resolve(true);
            sendEvent(getReactApplicationContext(), STARTED_EVENT, null);
        }
    }

    @ReactMethod
    public void stopListening(Promise promise) {
        if (!isListening) {
            promise.reject(NOT_LISTENING_ERROR, "Recognition is not currently listening");
        } else {
            recognizer.stop();
            isListening = false;
            isSuspended = false;
            lastHypothesis = "";
            promise.resolve(true);
            sendEvent(getReactApplicationContext(), STOPPED_EVENT, null);
        }
    }

    // Suspend and Resume here are not much different than start and stop here
    @ReactMethod
    public void suspend(Promise promise) {
        if (isSuspended) {
            promise.reject(ALREADY_SUSPENDED_ERROR, "Recognition is already suspended");
        } else if(!isListening) {
            promise.reject(NOT_LISTENING_ERROR, "Recognition is not listening so can't suspend");
        } else {
            recognizer.cancel();
            isSuspended = true;
            promise.resolve(true);
            sendEvent(getReactApplicationContext(), SUSPENDED_EVENT, null);
        }
    }

    @ReactMethod
    public void resume(Promise promise) {
        if (!isSuspended) {
            promise.reject(NOT_SUSPENDED_ERROR, "Recognition is not suspended");
        } else {
            recognizer.startListening(MODEL_PATH);
            isSuspended = false;
            promise.resolve(true);
            sendEvent(getReactApplicationContext(), RESUMED_EVENT, null);
        }
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    // region RecognitionListener
    @Override
    public void onBeginningOfSpeech() {
        sendEvent(getReactApplicationContext(), SPEECH_DETECTED_EVENT, null);
    }

    @Override
     public void onEndOfSpeech() {
         sendEvent(getReactApplicationContext(), SPEECH_ENDED_EVENT, null);
    }

    @Override
    public void onPartialResult(Hypothesis hypothesis) {
        if (hypothesis != null) {
            String newHypothesis = hypothesis.getHypstr();
            if (!newHypothesis.equals(lastHypothesis)) {
                String truncated = newHypothesis.replace(lastHypothesis, "");
                WritableMap params = Arguments.createMap();
                params.putString("hypothesis", truncated);
                params.putString("score", String.valueOf(hypothesis.getBestScore()));
                sendEvent(getReactApplicationContext(), HYPOTHESIS_EVENT, params);

                lastHypothesis = newHypothesis;
            }
        }
    }

    @Override
    public void onResult(Hypothesis hypothesis) {

    }

    @Override
    public void onError(Exception e) {
        //TODO("Not yet implemented")
    }

    @Override
    public void onTimeout() {
        //TODO("Not yet implemented")
    }

}