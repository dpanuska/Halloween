import * as cameraActions from 'src/redux/actions/CameraActions';

import {TaskGenerator, TaskGeneratorMap} from 'src/types/TaskFactoryTypes';

const CameraTasks = {
    TakePicture: 'TAKE_PICTURE',
    SavePicture: 'SAVE_PICTURE',
};

export const FactoryForTypes: TaskGeneratorMap = {
    [CameraTasks.TakePicture]: getTakePictureGenerator,
    // [CameraTasks.SavePicture]: getSavePictureGenerator,
};

function getTakePictureGenerator(): TaskGenerator | null {
    return {
        action: cameraActions.takePicture(),
    };
}
