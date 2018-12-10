import React from "react";
import PropTypes from "prop-types";
import { View, TextInput } from "react-native";

import Tag from "./Tag";
import styles from "./styles";

class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: props.initialTags,
      text: props.initialText
    };
  }

  componentWillReceiveProps(props) {
    const { initialTags = [], initialText = " " } = props;

    this.setState({
      tags: initialTags,
      text: initialText
    });
  }

  addTag = text => {
    this.setState(
      {
        tags: [...this.state.tags, text.trim()],
        text: " "
      },
      () => this.props.onChangeTags && this.props.onChangeTags(this.state.tags)
    );
  };

  onChangeText = text => {
    if (text.length === 0) {
      // `onKeyPress` isn't currently supported on Android; I've placed an extra
      //  space character at the start of `TextInput` which is used to determine if the
      //  user is erasing.
      this.setState(
        {
          tags: this.state.tags.slice(0, -1),
          text: this.state.tags.slice(-1)[0] || " "
        },
        () =>
          this.props.onChangeTags && this.props.onChangeTags(this.state.tags)
      );
    } else if (
      text.length > 1 &&
      this.props.createTagOnString.includes(text.slice(-1)) &&
      !(this.state.tags.indexOf(text.slice(0, -1).trim()) > -1)
    ) {
      this.addTag(text.slice(0, -1));
    } else {
      this.setState({ text });
    }
  };

  onSubmitEditing = () => {
    if (!this.props.createTagOnReturn) {
      return;
    }

    this.addTag(this.state.text);
  };

  render() {
    const {
      containerStyle,
      style,
      tagContainerStyle,
      tagTextStyle,
      deleteTagOnPress,
      onTagPress,
      readonly,
      maxNumberOfTags,
      inputStyle,
      inputContainerStyle,
      textInputProps
    } = this.props;

    return (
      <View style={[styles.container, containerStyle, style]}>
        {this.state.tags.map((tag, i) => (
          <Tag
            key={i}
            label={tag}
            onPress={e => {
              if (deleteTagOnPress) {
                this.setState(
                  {
                    tags: [
                      ...this.state.tags.slice(0, i),
                      ...this.state.tags.slice(i + 1)
                    ]
                  },
                  () => {
                    this.props.onChangeTags &&
                      this.props.onChangeTags(this.state.tags);
                    onTagPress && onTagPress(i, tag, e, true);
                  }
                );
              } else {
                onTagPress && onTagPress(i, tag, e, false);
              }
            }}
            readonly={readonly}
            tagContainerStyle={tagContainerStyle}
            tagTextStyle={tagTextStyle}
          />
        ))}

        {!readonly && maxNumberOfTags > this.state.tags.length && (
          <View style={[styles.textInputContainer, inputContainerStyle]}>
            <TextInput
              {...textInputProps}
              value={this.state.text}
              style={[styles.textInput, inputStyle]}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitEditing}
              underlineColorAndroid="transparent"
            />
          </View>
        )}
      </View>
    );
  }
}

Tags.defaultProps = {
  initialTags: [],
  initialText: " ",
  createTagOnString: [",", " "],
  createTagOnReturn: false,
  readonly: false,
  deleteTagOnPress: true,
  maxNumberOfTags: Number.POSITIVE_INFINITY
};

Tags.propTypes = {
  initialText: PropTypes.string,
  initialTags: PropTypes.arrayOf(PropTypes.string),
  createTagOnString: PropTypes.array,
  createTagOnReturn: PropTypes.bool,
  onChangeTags: PropTypes.func,
  readonly: PropTypes.bool,
  maxNumberOfTags: PropTypes.number,
  deleteTagOnPress: PropTypes.bool,
  containerStyle: PropTypes.any,
  style: PropTypes.any,
  inputContainerStyle: PropTypes.any,
  inputStyle: PropTypes.any,
  tagContainerStyle: PropTypes.any,
  tagTextStyle: PropTypes.any,
  /* these props are spread over the textInput */
  textInputProps: PropTypes.object
};

export { Tag };
export default Tags;
