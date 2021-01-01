import React, {Component} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as visualSelectors from '../selectors/VisualSelectors';

import {RootState} from '../types/StateTypes';

export interface Props {
    backgroundFile: string | null;
    text: string | null;
}

class OverlayView extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let {backgroundFile} = this.props;
        return (
            <View style={styles.container}>
                {backgroundFile && <View style={styles.image} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    image: {
        flex: 1,
    },
});

const mapStateToProps = (state: RootState) => {
    return {
        backgroundFile: visualSelectors.getBackgroundFile(state),
        text: visualSelectors.getText(state),
    };
};

export default connect(mapStateToProps)(OverlayView);
