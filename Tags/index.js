import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import Tag from "./Tag";
import Input from "./Input";
import styles from "./styles";

class Tags extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: props.initialTags,
      text: props.initialText
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.onAddTag) {
      this.addTag(nextProps.addedTag.tag_name, 0, nextProps.addedTag.fk_tag_id);
      this.props.onAddTagSuccess(false)
    }
  }

  showLastTag = () => {
    this.setState(state =>
      ({
        //tags: state.tags.slice(0, -1),
        text: state.tags.slice(-1)[0] || ""
      }),
      () =>
        this.props.onChangeTags && this.props.onChangeTags(this.state.tags)
    );
  };

  addTag = (text, isNew, tagId = '') => {
    if(this.state.tags.length === 15){
      alert('You can add a maximum of 15 hashtags, please try removing some')
      return
    }
    if(this.state.text.trim() === '#' || this.state.text.trim() === '##' || this.state.text.trim() === '###')
      return
    let updatedText = ''
    let duplicateTag = false
    if (text.charAt(0) === '#')
      updatedText = text
    else
      updatedText = '#' + text.trim()

    //Check for duplicate hashtags
    this.state.tags.map(item => {
      if (item.tagname === updatedText) {
        duplicateTag = true
      }
    })

    if (!duplicateTag) {
      const newTag = {
        tag_id: tagId,
        is_new: isNew,
        index: '',
        tagname: updatedText.trim()
      }

      this.setState(state =>
        ({
          tags: [...state.tags, newTag],
          text: ""
        }),
        () => this.props.onChangeTags && this.props.onChangeTags(this.state.tags)
      );
    }
    else {
      alert('You can’t add the same hashtag more than once')
    }
  };

  onChangeText = text => {
    // For restricting input of special characters
    if(/^[a-zA-Z0-9_#\s-]+$/.test(text) || text === '') {
      if(text.length > 30 && text.charAt(30) !== ' '){
        this.props.onChangeInput && this.props.onChangeInput(text)
        return
      }
      if (text.length === 0) {
        this.props.onChangeInput && this.props.onChangeInput(text)
        this.showLastTag();
      } else if (
        text.length > 1 &&
        this.props.createTagOnString.includes(text.slice(-1)) &&
        !text.match(new RegExp(`^[${this.props.createTagOnString.join("")}]+$`, 'g')) &&
        !(this.state.tags.indexOf(text.slice(0, -1).trim()) > -1)
      ) {
        this.addTag(text.slice(0, -1), 1);
      } else {
        this.props.onChangeInput && this.props.onChangeInput(text)
        this.setState({ text });
      }
    }
  };

  onSubmitEditing = () => {
    if (!this.props.createTagOnReturn || !this.state.text.trim().length > 0) {
      return;
    }
    this.addTag(this.state.text, 1);
  };

  render() {

    const {
      containerStyle,
      style,
      readonly,
      maxNumberOfTags,
      tagContainerStyle,
      tagTextStyle,
      deleteTagOnPress,
      onTagPress,
      renderTag
    } = this.props;

    return (
      <View style={[styles.container, containerStyle, style]}>

        {this.state.tags.map((tag, index) => {

          const tagProps = {
            tag,
            index,
            deleteTagOnPress,
            onPress: event => {
              event.persist();
              if (deleteTagOnPress && !readonly) {
                this.setState(state =>
                  ({
                    tags: [
                      ...state.tags.slice(0, index),
                      ...state.tags.slice(index + 1)
                    ]
                  }),
                  () => {
                    this.props.onChangeTags &&
                      this.props.onChangeTags(this.state.tags);
                    onTagPress && onTagPress(index, tag, event, true);
                  }
                );
              } else {
                onTagPress && onTagPress(index, tag, event, false);
              }
            },
            tagContainerStyle,
            tagTextStyle
          };

          return renderTag(tagProps);
        })}

        {!readonly
          && maxNumberOfTags > this.state.tags.length
          &&
          <Input
            value={this.state.text}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitEditing}
            totalTags={this.state.tags.length}
            {...this.props}
          />
        }

      </View>
    );
  };

}

Tags.defaultProps = {
  initialTags: [],
  initialText: "",
  createTagOnString: [" "],
  createTagOnReturn: false,
  readonly: false,
  deleteTagOnPress: true,
  maxNumberOfTags: Number.POSITIVE_INFINITY,
  renderTag: ({ tag, index, ...rest }) => (
    <Tag key={`${tag}-${index}`} label={tag} {...rest} />
  )
};

Tags.propTypes = {
  initialText: PropTypes.string,
  addedTag: PropTypes.object,
  placeholderText: PropTypes.string,
  initialTags: PropTypes.arrayOf(PropTypes.object),
  createTagOnString: PropTypes.array,
  createTagOnReturn: PropTypes.bool,
  onChangeTags: PropTypes.func,
  onChangeInput: PropTypes.func,
  readonly: PropTypes.bool,
  maxNumberOfTags: PropTypes.number,
  deleteTagOnPress: PropTypes.bool,
  onAddTag: PropTypes.bool,
  onAddTagSuccess: PropTypes.func,
  renderTag: PropTypes.func,
  /* style props */
  containerStyle: PropTypes.any,
  style: PropTypes.any,
  inputContainerStyle: PropTypes.any,
  inputStyle: PropTypes.any,
  tagContainerStyle: PropTypes.any,
  tagTextStyle: PropTypes.any,
  textInputProps: PropTypes.object
};

export { Tags };
export default Tags;
