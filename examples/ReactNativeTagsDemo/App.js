import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Tags from "react-native-tags";

const MyTagInput = () => (
  <View style={{ margin: 88 }}>
    <Tags
      initialText="monkey"
      textInputProps={{
        placeholder: "Any type of animal"
      }}
      initialTags={["dog", "cat", "chicken"]}
      onChangeTags={tags => console.log(tags)}
      onTagPress={(index, tagLabel, event, deleted) =>
        console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
      }
      containerStyle={{ justifyContent: "center" }}
      inputStyle={{ backgroundColor: "white" }}
      renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
        <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
          <Text>{tag}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

export default MyTagInput;
