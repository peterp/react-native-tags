import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import styles from "./styles";

const Tag = ({ label, onPress, tagContainerStyle, tagTextStyle, readonly }) => {
  const tagText = <Text style={[styles.tagLabel, tagTextStyle]}>{label}</Text>;

  if (readonly) {
    return (
      <View style={[styles.tag, tagContainerStyle]}>
        {tagText}
      </View>
    )
  } else {
    return (
      <TouchableOpacity style={[styles.tag, tagContainerStyle]} onPress={onPress}>
        {tagText}
      </TouchableOpacity>
    )
  }
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  readonly: PropTypes.bool
};

export default Tag;
