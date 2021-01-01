import React, {Component, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Camera} from 'expo-camera';
import {
    getAspectRatio,
    getUseFrontCamera,
    getIsPictureRequested,
} from '../selectors/CameraSelectors';
import {
    takePictureStarted,
    takePictureSucceeded,
    takePictureFailed,
} from '../actions/CameraActions';

import {RootState} from '../types/StateTypes';
import {Dispatch} from 'redux';

interface Props {
    aspectRatio: string;
    useFrontCamera: boolean;
    shouldTakePicture: boolean;
    onTakePictureStart: () => void;
    onTakePictureFailed: (error: Error) => void;
    onTakePictureComplete: (uri: string) => void;
}

class CameraView extends Component<Props> {
    cameraRef: any;
    constructor(props: Props) {
        super(props);
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
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onTakePictureStart: () => dispatch(takePictureStarted()),
        onTakePictureFailed: (error: Error) =>
            dispatch(takePictureFailed(error)),
        onTakePictureComplete: (uri: string) =>
            dispatch(takePictureSucceeded(uri)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);
