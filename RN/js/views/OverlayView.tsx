import React, {PureComponent} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import * as visualSelectors from 'src/redux/selectors/VisualSelectors';

import {RootState} from 'types/StateTypes';

export interface Props {
    backgroundResource: any;
    backgroundBase64: any;
    text: string | null;
}

class OverlayView extends PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let {backgroundBase64, backgroundResource, text} = this.props;
        let imageSource;
        if (backgroundBase64) {
            imageSource = {uri: `data:image/jpg;base64,${backgroundBase64}`};
        } else if (backgroundResource) {
            imageSource = backgroundResource;
        }

        var style = styles.container;
        if (imageSource != null) {
            style = {...style, ...styles.containerImage};
        }
        return (
            <View style={style}>
                {imageSource && (
                    <Image style={styles.image} source={imageSource} />
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
        backgroundColor: 'transparent',
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
        backgroundResource: visualSelectors.getBGResourceRequire(state),
        backgroundBase64: visualSelectors.getBackgroundImageBase64(state),
        text: visualSelectors.getText(state),
    };
};

export default connect(mapStateToProps)(OverlayView);
