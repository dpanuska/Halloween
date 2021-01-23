import TTSService from 'src/services/TTSService';

describe('TTSService', () => {
    // because TypeError: Super expression must either be null or a function when importing react-native-tts
    it('is not working right now', () => {});
});

// jest.mock('react-native-tts');
// jest.mock('react-native', () => ({
//     NativeModules: {
//         TextToSpeech: jest.fn(),
//     },
// }));

// import Tts from 'react-native-tts';
// import TTSService from 'src/services/TTSService';
// import {mocked} from 'ts-jest/utils';

// describe('TTSService', () => {
//     let ttsService: TTSService;
//     beforeEach(() => {
//         ttsService = new TTSService();
//     });

//     describe('initialize', () => {});

//     describe('speak', () => {
//         it('should handle successful speak', async () => {
//             let mockText = 'something to say';
//             await ttsService.speak(mockText);
//             expect(mocked(Tts.speak)).toHaveBeenCalledWith(mockText);
//         });
//     });

//     describe('stop', () => {});

//     describe('setDefaultLanguage', () => {});

//     describe('setDefaultPitch', () => {});

//     describe('setDefaultRate', () => {});
// });
