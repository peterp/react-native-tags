import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';


const Tag = ({
  label,
  onPress
}) => {
  const tag = (
    <TouchableOpacity style={[styles.tag]} onPress={onPress}>
      <Text style={[styles.tagLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
  return tag;
};
Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func
};


class Tags extends React.Component {
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

  componentWillReceiveProps(props) {
    const {
      initialTags = [],
      initialText = ' ',
    } = props;

    this.setState({
      tags: initialTags,
      text: initialText,
    });
  }

  onChangeText(text) {
    if (text.length === 0) {
      /* `onKeyPress` isn't currently supported on Android; I've placed an extra
        space character at the start of `TextInput` which is used to determine if the
        user is erasing.
      */
      this.setState({
        tags: this.state.tags.slice(0, -1),
        text: this.state.tags.slice(-1)[0] || ' ',
      }, () => this.props.onChangeTags && this.props.onChangeTags(this.state.tags));
    } else if (
      text.length > 1 &&
      (text.slice(-1) === ' ' || text.slice(-1) === ',')
    ) {
      this.setState({
        tags: [...this.state.tags, text.slice(0, -1).trim()],
        text: ' ',
      }, () => this.props.onChangeTags && this.props.onChangeTags(this.state.tags));
      ;
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
            onPress={ e => this.props.onTagPress(i, tag, e)}
          />)
        )}
        <View style={[styles.textInputContainer]}>
          <TextInput
            value={this.state.text}
            style={[styles.textInput, this.props.inputStyle]}
            onChangeText={this.onChangeText}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }
}
Tags.defaultProps = {
  inputStyle: {}
};
Tags.propTypes = {
  initialText: PropTypes.string,
  initialTags: PropTypes.arrayOf(PropTypes.string),
  onChangeTags: PropTypes.func,
  onTagPress: PropTypes.func,
  inputStyle: PropTypes.object
};


export { Tag };
export default Tags;
