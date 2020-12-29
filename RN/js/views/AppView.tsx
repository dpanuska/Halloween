import React, {Component} from 'react';
import {Button, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {sayText} from '../actions/TextToSpeechActions';
import BackgroundView from './BackgroundView';
import {setBackgroundFile} from '../actions/VisualActions';

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
      <SafeAreaView>
        <Button title="Touch me" onPress={this.onButtonPress} />
        <BackgroundView />
      </SafeAreaView>
    );
  }

  onButtonPress() {
    this.props.onButtonPressed();
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // dispatching plain actions
    onButtonPressed: () => dispatch(setBackgroundFile('Testing the stuff!')),
  };
};

export default connect(null, mapDispatchToProps)(AppView);
