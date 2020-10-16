import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  textInputContainer: {
    flex: 1,
    minWidth: 100,
    height: 36,
    margin: 2,
    borderRadius: 16,
    backgroundColor: "#F5F5F5"
  },

  textInput: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'GTWalsheim-Light'
  },

  tag: {
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    margin: 14
  },
  tagLabel: {
    fontSize: 13,
    color: "rgba(0, 0, 0, 0.87)"
  }
});
