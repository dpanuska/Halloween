import {AppConfig} from 'types/StateTypes';
import appConfig from 'res/config';
import {registerTaskGenerator} from 'src/services/task/TaskFactory';
import * as cameraFactory from 'src/services/task/CameraTaskFactory';
import * as voiceFactory from 'src/services/task/RecognitionTaskFactory';
import * as utilityFactory from 'src/services/task/UtilityTaskFactory';
import * as ttsFactory from 'src/services/task/TTSTaskFactory';
import * as visualFactory from 'src/services/task/VisualTaskFactory';

export async function fetchConfiguration(): Promise<AppConfig> {
    return appConfig;
}

// TODO: Potentially find a better place
export function initializeTaskGenerators() {
    registerTaskGenerator(cameraFactory.FactoryForTypes);
    registerTaskGenerator(voiceFactory.FactoryForTypes);
    registerTaskGenerator(utilityFactory.FactoryForTypes);
    registerTaskGenerator(ttsFactory.FactoryForTypes);
    registerTaskGenerator(visualFactory.FactoryForTypes);
}
