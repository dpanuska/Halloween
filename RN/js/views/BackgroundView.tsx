import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {connect} from 'react-redux';
import * as visualSelectors from '../selectors/VisualSelectors';

import {RootState} from '../types/StateTypes';

export interface Props {
    backgroundFile: string | null;
    text: string | null;
}

class BackgroundView extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        // let {backgroundFile} = this.props;
        // source={require({backgroundFile}
        return <View />;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        backgroundFile: visualSelectors.getBackgroundFile(state),
        text: visualSelectors.getText(state),
    };
};

export default connect(mapStateToProps)(BackgroundView);
