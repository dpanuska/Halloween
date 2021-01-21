import {
    getCameraState,
    getTrackedData,
    getIsPictureRequested,
    getIsTakingPicture,
    getAspectRatio,
    getUseFrontCamera,
    getPictureURI,
    getPictureBase64,
} from 'src/redux/selectors/CameraSelectors';
import {RequestStates} from 'src/types/StateTypes';
import {mockCameraState, mockRootState} from '../../../__mocks__/MockState';

describe('CameraSelectors', () => {
    it('should get camera slice of state', () => {
        expect(getCameraState(mockRootState)).toEqual(mockCameraState);
    });

    it('should get tracked data', () => {
        expect(getTrackedData(mockRootState)).toEqual(
            mockCameraState.trackedObject,
        );
    });

    it('should get if picture is requested', () => {
        expect(getIsPictureRequested(mockRootState)).toEqual(
            mockCameraState.isPictureRequested,
        );
    });

    it('should get if picture is being taken', () => {
        expect(getIsTakingPicture(mockRootState)).toEqual(
            mockCameraState.takePictureStatus.status === RequestStates.STARTED,
        );
    });

    it('should get aspect ratio', () => {
        expect(getAspectRatio(mockRootState)).toEqual(
            mockCameraState.aspectRatio,
        );
    });

    it('should get if front camera should be used', () => {
        expect(getUseFrontCamera(mockRootState)).toEqual(
            mockCameraState.useFrontCamera,
        );
    });

    it('should get picture uri', () => {
        expect(getPictureURI(mockRootState)).toEqual(
            mockCameraState.takePictureStatus.result?.uri,
        );
    });

    it('should get picture base64 data', () => {
        expect(getPictureBase64(mockRootState)).toEqual(
            mockCameraState.takePictureStatus.result?.base64,
        );
    });
});
