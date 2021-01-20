import * as cameraActions from 'src/redux/actions/CameraActions';
import {
    previewCameraPicture,
    savePictureFlow,
    takePictureFlow,
} from 'src/redux/sagas/CameraSagas';

import {TaskGenerator, TaskGeneratorMap} from 'src/types/TaskFactoryTypes';

const CameraTasks = {
    TakePicture: 'TAKE_PICTURE',
    SavePicture: 'SAVE_PICTURE',
    PreviewPicture: 'PREVIEW_PICTURE',
};

export const FactoryForTypes: TaskGeneratorMap = {
    [CameraTasks.TakePicture]: getTakePictureGenerator,
    [CameraTasks.SavePicture]: getSavePictureGenerator,
    [CameraTasks.PreviewPicture]: getPreviewPictureGenerator,
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

function getPreviewPictureGenerator(): TaskGenerator | null {
    return {
        generator: previewCameraPicture,
        action: cameraActions.previewPicture(),
    };
}
