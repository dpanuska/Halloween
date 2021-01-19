import * as cameraActions from 'src/redux/actions/CameraActions';
import {savePictureFlow, takePictureFlow} from 'src/redux/sagas/CameraSagas';

import {TaskGenerator, TaskGeneratorMap} from 'src/types/TaskFactoryTypes';

const CameraTasks = {
    TakePicture: 'TAKE_PICTURE',
    SavePicture: 'SAVE_PICTURE',
};

export const FactoryForTypes: TaskGeneratorMap = {
    [CameraTasks.TakePicture]: getTakePictureGenerator,
    [CameraTasks.SavePicture]: getSavePictureGenerator,
};

function getTakePictureGenerator(): TaskGenerator | null {
    return {
        generator: takePictureFlow,
        action: cameraActions.takePicture(),
    };
}

function getSavePictureGenerator(): TaskGenerator | null {
    return {
        generator: savePictureFlow,
        action: cameraActions.savePicture(),
    };
}
