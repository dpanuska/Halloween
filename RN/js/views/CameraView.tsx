import React, {Component} from 'react';
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
    detectionFrequency: number;
    onTakePictureStart: () => void;
    onTakePictureFailed: (error: Error) => void;
    onTakePictureComplete: (uri: string) => void;
    onObjectDetected: (data: any) => void;
}

class CameraView extends Component<Props> {
    cameraRef: any;
    detectionSettings: any;
    constructor(props: Props) {
        super(props);

        this.handleDetections = this.handleDetections.bind(this);

        // doesn't current;y change. but look into updating in useEffect
        this.detectionSettings = {
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: props.detectionFrequency,
            tracking: false,
        };
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
        this.props.onObjectDetected(data);
    }

    render() {
        let {aspectRatio, useFrontCamera} = this.props;
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
                    // onFacesDetected={this.handleDetections}
                    faceDetectorSettings={this.detectionSettings}
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
    return {
        aspectRatio: getAspectRatio(state),
        useFrontCamera: getUseFrontCamera(state),
        shouldTakePicture: getIsPictureRequested(state),
        detectionFrequency: getDetectionFrequency(state),
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
