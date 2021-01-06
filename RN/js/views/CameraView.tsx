import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Camera} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {
    getAspectRatio,
    getUseFrontCamera,
    getIsPictureRequested,
} from '../selectors/CameraSelectors';
import {getDetectionFrequency} from '../selectors/AppSelectors'
import {
    takePictureStarted,
    takePictureSucceeded,
    takePictureFailed,
    objectDetected,
} from '../actions/CameraActions';

import {RootState} from '../types/StateTypes';
import {Dispatch} from 'redux';

interface Props {
    aspectRatio: string;
    useFrontCamera: boolean;
    shouldTakePicture: boolean;
    detectionSettings: any;
    onTakePictureStart: () => void;
    onTakePictureFailed: (error: Error) => void;
    onTakePictureComplete: (uri: string) => void;
    onObjectDetected: (data: any) => void;
}

interface State {
    isCameraReady: boolean;
}

class CameraView extends PureComponent<Props, State> {
    cameraRef: any;
    constructor(props: Props) {
        super(props);

        this.handleDetections = this.handleDetections.bind(this);

        this.state = {isCameraReady: false};
    }

    componentDidUpdate(prevProps: Props) {
        let {shouldTakePicture} = this.props;
        if (shouldTakePicture && !prevProps.shouldTakePicture) {
            this.takePictureAsync();
        }
    }

    // Not really ideal to do this here
    async takePictureAsync() {
        let {
            onTakePictureStart,
            onTakePictureComplete,
            onTakePictureFailed,
        } = this.props;
        onTakePictureStart();
        if (this.cameraRef == null) {
            onTakePictureFailed(new Error('Camera ref isnt set'));
        } else {
            try {
                let result = await this.cameraRef.takePictureAsync();
                onTakePictureComplete(result.uri);
            } catch (error) {
                onTakePictureFailed(error);
            }
        }
    }

    handleDetections(data: any) {
        if (data.faces.length > 0) {
            this.props.onObjectDetected(data);
        }
    }

    render() {
        let {aspectRatio, detectionSettings, useFrontCamera} = this.props;
        let {isCameraReady} = this.state;
        let cameraType = useFrontCamera
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back;
        return (
            <View style={styles.container}>
                <Camera
                    ref={(ref) => {
                        this.cameraRef = ref;
                    }}
                    style={styles.camera}
                    type={cameraType}
                    ratio={aspectRatio}
                    // TODO something wrong with android - Firebase not setup right
                    onFacesDetected={
                        isCameraReady ? this.handleDetections : undefined
                    }
                    faceDetectorSettings={detectionSettings}
                    onCameraReady={() => this.setState({isCameraReady: true})}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
});

const mapStateToProps = (state: RootState) => {
    let detectionFrequency = getDetectionFrequency(state);
    let detectionSettings = {
        mode: FaceDetector.Constants.Mode.fast,
        detectLandmarks: FaceDetector.Constants.Landmarks.none,
        runClassifications: FaceDetector.Constants.Classifications.none,
        minDetectionInterval: detectionFrequency,
        tracking: false,
    };
    return {
        aspectRatio: getAspectRatio(state),
        useFrontCamera: getUseFrontCamera(state),
        shouldTakePicture: getIsPictureRequested(state),
        detectionSettings,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onTakePictureStart: () => dispatch(takePictureStarted()),
        onTakePictureFailed: (error: Error) =>
            dispatch(takePictureFailed(error)),
        onTakePictureComplete: (uri: string) =>
            dispatch(takePictureSucceeded(uri)),
        onObjectDetected: (data: any) => dispatch(objectDetected(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);
