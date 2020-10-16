import React from "react";
import { View, TextInput } from "react-native";

import styles from "./styles";

const Input = (props) => {

  const {
    value,
    onChangeText,
    onSubmitEditing,
    inputStyle,
    inputContainerStyle,
    textInputProps,
    placeholderText,
    totalTags
  } = props;

  return (
    <View style={[styles.textInputContainer, inputContainerStyle]}>
      <TextInput
        {...textInputProps}
        placeholder={totalTags === 0 ? placeholderText : ''}
        style={[styles.textInput, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
    </View>
  );

};

export { Input };
export default Input;
