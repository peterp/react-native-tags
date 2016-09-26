# React-Native-Tags

A component that allows you to input text and formats the text into a tag when a space or comma is entered.

```
import React from 'react';
import Tags from 'react-native-tags';
const UselessComponent = () => <Tags />;
```

## Props

**initialText** PropTypes.string

Populates the text input.

**initialTags** PropTypes.array

Populates the tags.

**onTagsChange** PropTypes.func

Callback that is called when a tag is added or removed.
