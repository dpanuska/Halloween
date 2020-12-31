import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Camera} from 'expo-camera';

class CameraView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.front}
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

export default connect()(CameraView);
