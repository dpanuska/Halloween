//
//  VoiceRecognition.m
//  Halloween
//
//  Created by Dan on 1/25/21.
//

#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>
#import <OpenEars/OELanguageModelGenerator.h>
#import <OpenEars/OEAcousticModel.h>
#import <OpenEars/OEPocketsphinxController.h>
#import <OpenEars/OEEventsObserver.h>

#import "VoiceRecognition.h"

NSString *const LANGUAGE_MODEL_FILE = @"currentModel";
NSString *const NO_WORDS_ERROR = @"NO_WORD_ERROR";
NSString *const ALREADY_LISTENING_ERROR = @"ALREADY_LISTENING_ERROR";
NSString *const ALREADY_SUSPENDED_ERROR = @"ALREADY_SUSPENDED_ERROR";
NSString *const NOT_LISTENING_ERROR = @"NOT_LISTENING_ERROR";
NSString *const NOT_SUSPENDED_ERROR = @"NOT_SUSPENDED_ERROR";

NSString *const HYPOTHESIS_EVENT = @"Hypothesis";
NSString *const STARTED_EVENT = @"Started";
NSString *const STOPPED_EVENT = @"Stopped";
NSString *const SPEECH_DETECTED_EVENT = @"SpeechDetected";
NSString *const SPEECH_ENDED_EVENT = @"SpeechEnded";
NSString *const SUSPENDED_EVENT = @"Suspended";
NSString *const RESUMED_EVENT = @"Resumed";

@interface VoiceRecognition () <OEEventsObserverDelegate>
@property (nonatomic, strong) OEEventsObserver *openEarsEventsObserver;
@property (nonatomic, strong) OELanguageModelGenerator *lmGenerator;
@property (nonatomic, strong) NSString *modelPath;
@property (nonatomic, strong) NSString *dictionaryPath;
@property (nonatomic, strong) OEPocketsphinxController *sphinxController;
@property BOOL hasListeners;
@end

@implementation VoiceRecognition

RCT_EXPORT_MODULE()

-(NSArray<NSString *> *)supportedEvents {
  return @[HYPOTHESIS_EVENT, STARTED_EVENT, STOPPED_EVENT, SPEECH_DETECTED_EVENT, SPEECH_ENDED_EVENT, SUSPENDED_EVENT, RESUMED_EVENT];
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

-(instancetype)init
{
    self = [super init];
    if (self) {
      self.sphinxController = [OEPocketsphinxController sharedInstance];
      [self.sphinxController setActive:YES error:nil];
      self.openEarsEventsObserver = [[OEEventsObserver alloc] init];
      [self.openEarsEventsObserver setDelegate:self];
      self.lmGenerator = [[OELanguageModelGenerator alloc] init];
    }
    return self;
}

// Will be called when this module's first listener is added.
- (void)startObserving {
  self.hasListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving {
  self.hasListeners = NO;
}

RCT_EXPORT_METHOD(setRecognitionWords:(NSArray<NSString *> *)words
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSError *error = [self.lmGenerator generateLanguageModelFromArray:words withFilesNamed:LANGUAGE_MODEL_FILE forAcousticModelAtPath:[OEAcousticModel pathToModel:@"AcousticModelEnglish"]];
  
  if (error) {
    reject(@"error", @"error description", error);
    return;
  }
 
  self.modelPath = [self.lmGenerator pathToSuccessfullyGeneratedLanguageModelWithRequestedName:LANGUAGE_MODEL_FILE];
  self.dictionaryPath = [self.lmGenerator pathToSuccessfullyGeneratedDictionaryWithRequestedName:LANGUAGE_MODEL_FILE];
  
  resolve([NSNumber numberWithBool:YES]);
}

RCT_EXPORT_METHOD(startListening:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  
  if (self.sphinxController.isListening) {
    reject(ALREADY_LISTENING_ERROR, @"Recognition is already listening", nil);
    return;
  }
  if (!self.modelPath || !self.dictionaryPath) {
    reject(NO_WORDS_ERROR, @"Recognition no word dictionary has been set", nil);
    return;
  }
  
  [self.sphinxController setActive:YES error:nil];
  [self.sphinxController startListeningWithLanguageModelAtPath:self.modelPath dictionaryAtPath:self.dictionaryPath acousticModelAtPath:[OEAcousticModel pathToModel:@"AcousticModelEnglish"] languageModelIsJSGF:NO];
  
  resolve([NSNumber numberWithBool:YES]);
}

RCT_EXPORT_METHOD(stopListening:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  if (self.sphinxController.isListening) {
    [self.sphinxController stopListening];
    resolve([NSNumber numberWithBool:YES]);
  } else {
    reject(NOT_LISTENING_ERROR, @"Recognition is already stopped", nil);
  }
}

RCT_EXPORT_METHOD(suspend:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  if (!self.sphinxController.isSuspended) {
    [self.sphinxController suspendRecognition];
    resolve([NSNumber numberWithBool:YES]);
  } else if(!self.sphinxController.isListening) {
    reject(NOT_LISTENING_ERROR, @"Recognition is not listenening and can't be suspended", nil);
  } else {
    reject(ALREADY_SUSPENDED_ERROR, @"Recognition is already suspended", nil);
  }
  
}

RCT_EXPORT_METHOD(resume:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  if (self.sphinxController.isSuspended) {
    [self.sphinxController resumeRecognition];
    resolve([NSNumber numberWithBool:YES]);
  } else {
    reject(NOT_SUSPENDED_ERROR, @"Recognition is not suspended", nil);
  }
}

- (void) pocketsphinxDidReceiveHypothesis:(NSString *)hypothesis recognitionScore:(NSString *)recognitionScore utteranceID:(NSString *)utteranceID {
  
  if (self.hasListeners) {
    [self sendEventWithName:HYPOTHESIS_EVENT body:@{@"hypothesis": hypothesis, @"score": recognitionScore, @"utteranceId": utteranceID}];
  }
}

- (void) pocketsphinxDidStartListening {
  if (self.hasListeners) {
    [self sendEventWithName:STARTED_EVENT body:nil];
  }
}

- (void) pocketsphinxDidDetectSpeech {
  if (self.hasListeners) {
    [self sendEventWithName:SPEECH_DETECTED_EVENT body:nil];
  }
}

- (void) pocketsphinxDidDetectFinishedSpeech {
  if (self.hasListeners) {
    [self sendEventWithName:SPEECH_ENDED_EVENT body:nil];
  }
}

- (void) pocketsphinxDidStopListening {
  if (self.hasListeners) {
    [self sendEventWithName:STOPPED_EVENT body:nil];
  }
}

- (void) pocketsphinxDidSuspendRecognition {
  if (self.hasListeners) {
    [self sendEventWithName:SUSPENDED_EVENT body:nil];
  }
}

- (void) pocketsphinxDidResumeRecognition {
  if (self.hasListeners) {
    [self sendEventWithName:RESUMED_EVENT body:nil];
  }
}

//- (void) pocketsphinxDidChangeLanguageModelToFile:(NSString *)newLanguageModelPathAsString andDictionary:(NSString *)newDictionaryPathAsString {
//  NSLog(@"Pocketsphinx is now using the following language model: \n%@ and the following dictionary: %@",newLanguageModelPathAsString,newDictionaryPathAsString);
//}
//
//- (void) pocketSphinxContinuousSetupDidFailWithReason:(NSString *)reasonForFailure {
//  NSLog(@"Listening setup wasn't successful and returned the failure reason: %@", reasonForFailure);
//}
//
//- (void) pocketSphinxContinuousTeardownDidFailWithReason:(NSString *)reasonForFailure {
//  NSLog(@"Listening teardown wasn't successful and returned the failure reason: %@", reasonForFailure);
//}
//
//- (void) testRecognitionCompleted {
//  NSLog(@"A test file that was submitted for recognition is now complete.");
//}

@end
