import {
    getCameraState,
    getTrackedData,
    getIsPictureRequested,
    getIsTakingPicture,
    getAspectRatio,
    getUseFrontCamera,
} from '../CameraSelectors';
import {mockCameraState, mockRootState} from '../../__mocks__/MockState';

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
            mockCameraState.isTakingPicture,
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
});
