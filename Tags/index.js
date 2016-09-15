import React, { PropTypes } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import styles from './styles';


const Tag = ({
  label,
}) => {
  const tag = (
    <View style={[styles.tag]}>
      <Text style={[styles.tagLabel]}>
        {label}
      </Text>
    </View>
  );
  return tag;
};
Tag.propTypes = {
  label: PropTypes.string.isRequired,
};


class TagInput extends React.Component {
  constructor(props) {
    super(props);

    const {
      initialTags = [],
      initialText = ' ',
    } = props;

    this.state = {
      tags: initialTags,
      text: initialText,
    };

    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(text) {
    if (text.length === 0) {
      /* `onKeyPress` isn't currently supported on Android; I've placed an extra
        space character at the start of `TextInput` which is used to determine if the
        user is erasing.
      */
      const tags = this.state.tags.slice(0, -1); 
      this.setState({
        tags,
        text: this.state.tags.slice(-1)[0] || ' ',
      });
      this.props.onChangeTags(tags);
    } else if (
      text.length > 1 &&
      (text.slice(-1) === ' ' || text.slice(-1) === ',')
    ) {
      const tags = [...this.state.tags, text.slice(0, -1)];
      this.setState({
        tags: tags,
        text: ' ',
      });
      this.props.onChangeTags(tags);
    } else {
      this.setState({ text });
    }
  }

  render() {
    return (
      <View style={[styles.container]}>

        {this.state.tags.map((tag, i) => (
          <Tag
            key={i}
            label={tag}
            onPress={this.props.onTagPress}
          />)
        )}

        <View style={[styles.textInputContainer]}>
          <TextInput
            value={this.state.text}
            style={[styles.textInput]}
            onChangeText={this.onChangeText}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }
}
TagInput.propTypes = {
  initialText: PropTypes.string,
  initialTags: PropTypes.arrayOf(PropTypes.string),
  onChangeTags: PropTypes.func,
};


export default TagInput;
