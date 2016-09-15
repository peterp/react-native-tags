import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TagInput from '../';

describe('TagInput', () => {

  function noop() {};

  function createComponent(props = {}) {
    return (
      <TagInput
        initialText="monkey gland sauce."
        initialTags={['tomato sauce', 'mustard', 'mayo']}
      />
    )
  }
  

  it('should render props correctly', () => {
    const tree = renderer.create(createComponent()).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
