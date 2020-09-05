/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Tags from 'react-native-tags';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTags: ['dog', 'cat', 'chicken'],
      initialText: '',
    };
  }

  _renderTag = ({tag, index, onPress, deleteTagOnPress, readonly}) => {
    return (
      <TouchableOpacity
        key={`${tag}-${index}`}
        onPress={onPress}
        style={styles.tag}>
        <Text style={styles.textTag}>{tag}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.screen}>
        <Tags
          containerStyle={styles.container}
          initialText={this.state.initialText}
          textInputProps={{
            placeholderTextColor: '#D6D6D6',
            placeholder: 'Any type of animal',
          }}
          inputStyle={styles.input}
          initialTags={this.state.initialTags}
          onChangeTags={this._onChangeTags}
          onTagPress={this._onTagPress}
          renderTag={this._renderTag}
        />
      </View>
    );
  }

  _onTagPress = (index, tagLabel, event, deleted) => {
    console.log(index, tagLabel, event, deleted ? 'deleted' : 'not deleted');
  };

  _onChangeTags = tags => {
    this.setState({initialTags: tags});
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D6D6D6',
  },
  container: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },
  tag: {
    backgroundColor: '#2A5353',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  textTag: {
    color: '#EBEBEB',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    color: '#606060',
    fontWeight: 'bold',
  },
});

export default App;
