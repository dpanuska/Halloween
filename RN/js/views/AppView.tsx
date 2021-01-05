import React, {Component} from 'react';
import {Button, SafeAreaView, View, StatusBar, StyleSheet} from 'react-native';
import CameraView from './CameraView';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {sayText} from '../actions/TTSActions';
import {setBackgroundFile, setText} from '../actions/VisualActions';
import BackgroundView from './OverlayView';
// import {setBackgroundFile} from '../actions/VisualActions';
import {takePicture} from '../actions/CameraActions';

export interface Props {
    onButtonPressed: () => void;
}

class AppView extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar hidden />
                <View style={styles.camera}>
                    <CameraView />
                </View>
                <View style={styles.overlay}>
                    <Button title="Touch me" onPress={this.onButtonPress} />
                    <BackgroundView />
                </View>
            </SafeAreaView>
        );
    }

    onButtonPress() {
        this.props.onButtonPressed();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        // onButtonPressed: () => dispatch(sayText('Testing the stuff!')),
        // onButtonPressed: () => dispatch(takePicture()),
        onButtonPressed: () => dispatch(setBackgroundFile('dylan')),
    };
};

export default connect(null, mapDispatchToProps)(AppView);
