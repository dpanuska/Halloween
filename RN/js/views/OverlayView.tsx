import React, {PureComponent} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import * as visualSelectors from '../selectors/VisualSelectors';

import {RootState} from '../types/StateTypes';

export interface Props {
    backgroundImage: any;
    text: string | null;
}

class OverlayView extends PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let {backgroundImage, text} = this.props;
        var style = styles.container;
        if (backgroundImage != null) {
            style = {...style, ...styles.containerImage};
        }
        return (
            <View style={style}>
                {backgroundImage && (
                    <Image style={styles.image} source={backgroundImage} />
                )}
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerImage: {
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
        alignSelf: 'center',
    },
    text: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        fontSize: 80,
        color: 'white',
        textAlign: 'center',
    },
});

const mapStateToProps = (state: RootState) => {
    return {
        backgroundImage: visualSelectors.getBackgroundResource(state),
        text: visualSelectors.getText(state),
    };
};

export default connect(mapStateToProps)(OverlayView);
