jest.mock('src/services/task/TaskFactory');

import {initializeTaskGenerators} from 'src/services/AppService';
import {registerTaskGenerator} from 'src/services/task/TaskFactory';
import * as cameraFactory from 'src/services/task/CameraTaskFactory';
import * as voiceFactory from 'src/services/task/RecognitionTaskFactory';
import * as utilityFactory from 'src/services/task/UtilityTaskFactory';
import * as ttsFactory from 'src/services/task/TTSTaskFactory';
import * as visualFactory from 'src/services/task/VisualTaskFactory';
import {mocked} from 'ts-jest/utils';

describe('AppService', () => {
    it('should register all task generators', () => {
        initializeTaskGenerators();
        expect(mocked(registerTaskGenerator).mock.calls).toEqual([
            [cameraFactory.FactoryForTypes],
            [voiceFactory.FactoryForTypes],
            [utilityFactory.FactoryForTypes],
            [ttsFactory.FactoryForTypes],
            [visualFactory.FactoryForTypes],
        ]);
    });
});
