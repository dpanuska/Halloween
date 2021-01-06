import React, {PureComponent} from 'react';
import {
    ActivityIndicator,
    Button,
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
} from 'react-native';
import CameraView from './CameraView';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {fetchAppConfig} from '../actions/AppActions';
import {fetchTaskConfig, fetchTasks} from '../actions/TaskActions';
import {setBackgroundFile} from '../actions/VisualActions';
import BackgroundView from './OverlayView';
import {getIsAppConfigFetched} from '../selectors/AppSelectors';
import {
    getIsTaskConfigFetched,
    getAreTasksFetched,
} from '../selectors/TaskSelectors';

import {RootState} from '../types/StateTypes';

export interface Props {
    isEverythingFetched: boolean;
    fetchAppConfig: () => void;
    fetchTaskConfig: () => void;
    fetchTasks: () => void;
    onButtonPressed: () => void;
}

class AppView extends PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    componentDidMount() {
        let {fetchAppConfig, fetchTaskConfig, fetchTasks} = this.props;
        fetchAppConfig();
        fetchTaskConfig();
        fetchTasks();
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
    let isEverythingFetched =
        isConfigFetched && isTaskConfigFetched && areTasksFetched;
    return {
        isEverythingFetched,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchAppConfig: () => dispatch(fetchAppConfig()),
        fetchTaskConfig: () => dispatch(fetchTaskConfig()),
        fetchTasks: () => dispatch(fetchTasks()),
        onButtonPressed: () => dispatch(setBackgroundFile('dylan')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
