import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Tags from '../../';


describe('Tags', () => {
  function createComponent(props = {}) {
    return (
      <Tags
        initialText="monkey gland sauce."
        initialTags={['tomato sauce', 'mustard', 'mayo']}
      />
    )
  }
  

  it('should render props correctly', () => {
    const tree = renderer.create(createComponent()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // TODO: Test that:
  // should create a new tag and clear the text input when ` ` or `,` are entered.
  // should remove the last tag, and populate the text input when backspace is entered.
  // should call `onChangeTags` when tags are added and removed.

});
