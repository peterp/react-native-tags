import React from "react";
import { View, TextInput } from "react-native";

import styles from "./styles";

const Input = (props) => {

  const {
    inputStyle,
    inputContainerStyle,
    textInputProps
  } = props;

  return (
    <View style={[styles.textInputContainer, inputContainerStyle]}>
      <TextInput
        {...textInputProps}
        style={[styles.textInput, inputStyle]}

        value={props.value}
        onChangeText={props.onChangeText}
        onSubmitEditing={props.onSubmitEditing}
        
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export {Input};
export default Input;