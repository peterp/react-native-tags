# React-Native-Tags

[![Build Status](https://travis-ci.org/peterp/react-native-tags.svg?branch=master)](https://travis-ci.org/peterp/react-native-tags)
[![npm](https://img.shields.io/npm/dt/express.svg)](https://www.npmjs.com/package/react-native-tags)

A React Native component that allows you to input text and formats the text
into a tag when a space or comma is entered. Tapping on the tag will remove it.

![Demo](https://camo.githubusercontent.com/e3d6f3f87e625ad787bda1e7b518307d29d21a23/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f6c34394a5036786c6847723138795a46652f67697068792e676966)

## Installation

```terminal
npm install --save react-native-tags
```

```terminal
yarn add react-native-tags
```

## Usage

```jsx
import React from "react";
import Tags from "react-native-tags";

const UselessComponent = () => (
  <Tags
    initialText="monkey"
    initialTags={["dog", "cat", "chicken"]}
    onChangeTags={tags => console.log(tags)}
    onTagPress={(index, tagLabel, event, deleted) =>
      console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
    }
    containerStyle={{ justifyContent: "center" }}
    inputStyle={{ backgroundColor: "white" }}
  />
);
```

## Props

| PropName          | Description                                | Default  |
| ----------------- | ------------------------------------------ | -------- |
| initialText       | The input element's text                   |          |
| initialTags       | ['the', 'initial', 'tags']                 |          |
| onChangeTags      | Fires when tags are added or removed       |          |
| maxNumberOfTags   | The max number of tags that can be entered | infinity |
| onTagPress        | Fires when tags are pressed                |          |
| readonly          | Tags cannot be modified                    | false    |
| deleteTagOnPress  | Remove the tag when pressed                | true     |
| containerStyle    | Style                                      |          |
| style             | Style (`containerStyle` alias)             |          |
| inputStyle        | Style                                      |          |
| tagContainerStyle | Style                                      |          |
| tagTextStyle      | Style                                      |          |
