# Halloween
Halloween android thing

## Disclaimer
I hold no rights to any image or gif used except me grabbing a bag of candy.  I will try updating this with a "clean" version in the future to remove any
potentially copyright material. Please don't hurt me!

This is the first time I've ever used Kotlin and Android OS 11 features, so do not take this as gospel, and leave critisism of the contructive kind.
Very willing to take that and improve, time allowing.


## Summary
This application is for detecting people and greeting trick or treaters for Halloween. 
It is written for Android OS 11 (SDK 30) using a device with the front camera available.

## Supported Tasks
- TAKE_PICTURE - Takes a picture from current (front) camera
- SAVE_PICTURE - Saves a picture - must be linked to a suspended task that returns a Bitmap (TAK_PICTURE)
- DELAY - Delays execution of next task in a list - automatic suspension
- SPEECH_TEXT - Says something using text to speech
- SPEECH_LOCALE - Set Locale for speech
- SPEECH_PITCH - Set the pitch for TTS
- SPEECH_RATE - Set the speech rate for TTS
- SPEECH_RESET - Reset speech locale, rate, and pitch
- VISUAL_BACKGROUND - Set a backgroung image
- VISUAL_BACKGROUND_CHAINED - Set a background image - must be linked to a suspended task that returns a Bitmap (TAK_PICTURE)
- VISUAL_BACKGROUND_GIF - Set a background gif
- VISUAL_TEXT - Set text displayed over any image displayed
- VISUAL_RESET - Set visuals back to default
- SET_RECOGNITION - Set voice recognition to a defined list of terms (see improvements for further info)
- STOP_RECOGNITION - Stop listening for voice terms
- NAMED - Use a task which has a given name
- TYPED - Use a random task of the given type


## Why JSON?
This could be extended to use a service to provide "packs" of sorts to provide custom usage, including downloading images and gifs from proivided URLs and
custom text or voice recognition prompts.

## How it works
It uses mlKit to detect a Pose (human body articulation) which will kick off a GREETING type task.  Upon body leaving detection it will kick off a BOODBYE task.
While still "active" from a detected pose, it will choose an ACTIVE_IDLE task at random to execute every x seconds.

## Task Composition
Tasks are defined using TaskList in code. Note: Do not use circular definitions. It will cause a stack overflow...
Loaded from JSON this looks like the following
```
{
  "taskDefinitions": [
    {
      "type": "GREETING",
      "subTasks": [
        {
          "type": "SPEECH_RESET"
        },
        {
          "type": "VISUAL_RESET"
        },
        {
          "type": "NAMED",
          "name": "CAMERA_PICTURE_BASE"

        },
        {
          "type": "TYPED",
          "taskType": "GREETING_SUB",
          "suspend": true
        },
        {
          "type": "TYPED",
          "taskType": "INTRO",
          "suspend": true
        }
      ]
    },
     {
      "type": "GREETING_SUB",
      "subTasks": [
        {
          "type": "VISUAL_BACKGROUND_GIF",
          "resource": "hello_obi"
        },
        {
          "type": "DELAY",
          "duration": 1.5
        },
        {
          "type": "SPEECH_TEXT",
          "text": "Hello There!",
          "suspend": true
        }
      ]
    },
    {
      "type": "CAMERA_PICTURE",
      "name": "CAMERA_PICTURE_BASE",
      "subTasks": [
        {
          "type": "TAKE_PICTURE",
          "suspend": true
        },
        {
          "type": "SAVE_PICTURE"
        }
      ]
    },
    {
      "type": "INTRO",
      "subTasks": [
        {
          "type": "TYPED",
          "taskType": "INTRO_IMAGE"
        },
        {
          "type": "SPEECH_TEXT",
          "text": "Happy Halloween!",
          "suspend": true
        },
        {
          "type": "TYPED",
          "taskType": "HANDS",
          "suspend": true
        },
        {
          "type": "TYPED",
          "taskType": "GRAB_CANDY",
          "suspend": true
        },
        {
          "type": "TYPED",
          "taskType": "IDLE"
        }
      ]
    },
    ...
  }]
}
```

## Possible Improvements
- Tests
- Check available locale for speech
- Better permissions handling
- Task Schema with UI for creation - Mobile and/or web creation of tasks
- Visuals pre-loaded from web based on definitions
- Service to provide "Packs" of tasks
- Load pocketsphinx terms from JSON definitions rather than predefined grammar files
- Better error handling
- Better logging
- More data driven in general - define wait time for "GREETING" - define what "GREETING" is in task "pack" etc.

## What's this good for?
Not sure... Fun for Halloween.  Could be used for kiosks in comercial use.

