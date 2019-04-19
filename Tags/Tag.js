import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

const Tag = ({ label, onPress, tagContainerStyle, tagTextStyle }) => {
  return (
    <TouchableOpacity style={[styles.tag, tagContainerStyle]} onPress={onPress}>
      <Text style={[styles.tagLabel, tagTextStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Tag;
