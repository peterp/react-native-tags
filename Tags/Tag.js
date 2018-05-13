import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import styles from "./styles";

const Tag = ({ label, onPress, tagContainerStyle, tagTextStyle }) => (
  <TouchableOpacity style={[styles.tag, tagContainerStyle]} onPress={onPress}>
    <Text style={[styles.tagLabel, tagTextStyle]}>{label}</Text>
  </TouchableOpacity>
);

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

export default Tag;
