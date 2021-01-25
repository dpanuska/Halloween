//
//  VoiceRecognition.h
//  Halloween
//
//  Created by Dan on 1/25/21.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>


@interface VoiceRecognition : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic, strong) OEEventsObserver *openEarsEventsObserver;
@property (nonatomic, strong) OELanguageModelGenerator *lmGenerator;
@property (nonatomic, strong) NSString *modelPath;
@property (nonatomic, strong) NSString *dictionaryPath;
@property (nonatomic, strong) OEPocketsphinxController *sphinxController;

@end
