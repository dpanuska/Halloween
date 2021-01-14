import React, {PureComponent} from 'react';
import {
    ActivityIndicator,
    Button,
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
} from 'react-native';
import CameraView from 'src/views/CameraView';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {fetchAppConfig} from 'src/redux/actions/AppActions';
import {fetchTaskConfig, fetchTasks} from 'src/redux/actions/TaskActions';
import {initialize, reset} from 'src/redux/actions/TTSActions';
import BackgroundView from 'src/views/OverlayView';
import {getIsAppConfigFetched} from 'src/redux/selectors/AppSelectors';
import {
    getIsTaskConfigFetched,
    getAreTasksFetched,
} from 'src/redux/selectors/TaskSelectors';
import {getIsInitialized} from 'src/redux/selectors/TTSSelectors';

import {RootState} from 'types/StateTypes';
import {sayText} from 'src/redux/actions/TTSActions';

export interface Props {
    isEverythingFetched: boolean;
    requestFetchAppConfig: () => void;
    requestFetchTaskConfig: () => void;
    requestFetchTasks: () => void;
    requestInitTTS: () => void;
    requestSetTTSDefaults: () => void;
    onButtonPressed: () => void;
}

class AppView extends PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    componentDidMount() {
        let {
            requestFetchAppConfig,
            requestFetchTaskConfig,
            requestFetchTasks,
            requestInitTTS,
        } = this.props;
        requestFetchAppConfig();
        requestFetchTaskConfig();
        requestFetchTasks();
        requestInitTTS();
    }

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.isEverythingFetched && this.props.isEverythingFetched) {
            this.props.requestSetTTSDefaults();
        }
    }

    render() {
        let {isEverythingFetched} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar hidden />
                {isEverythingFetched ? (
                    <View style={styles.content}>
                        <View style={styles.camera}>
                            <CameraView />
                        </View>
                        <View style={styles.overlay}>
                            <Button
                                title="Touch me"
                                onPress={this.onButtonPress}
                            />
                            <BackgroundView />
                        </View>
                    </View>
                ) : (
                    <ActivityIndicator size="large" />
                )}
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
    content: {
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

const mapStateToProps = (state: RootState) => {
    let isConfigFetched = getIsAppConfigFetched(state);
    let isTaskConfigFetched = getIsTaskConfigFetched(state);
    let areTasksFetched = getAreTasksFetched(state);
    let isTTSInited = getIsInitialized(state);
    let isEverythingFetched =
        isConfigFetched &&
        isTaskConfigFetched &&
        areTasksFetched &&
        isTTSInited;
    return {
        isEverythingFetched,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        requestFetchAppConfig: () => dispatch(fetchAppConfig()),
        requestFetchTaskConfig: () => dispatch(fetchTaskConfig()),
        requestFetchTasks: () => dispatch(fetchTasks()),
        requestInitTTS: () => dispatch(initialize()),
        requestSetTTSDefaults: () => dispatch(reset()),
        onButtonPressed: () => dispatch(sayText('dylan')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
