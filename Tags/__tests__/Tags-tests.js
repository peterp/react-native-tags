import React from 'react';
import renderer from 'react-test-renderer';
import Tags from '../../';


describe('Tags', () => {
  const noop = function() {};

  function createComponent(props = {}) {
    return (
      <Tags
        initialText="monkey gland sauce."
        initialTags={['tomato sauce', 'mustard', 'mayo']}
        onChangeTags={noop}
      />
    )
  }

  it('should render props correctly', () => {
    const tree = renderer.create(createComponent()).toJSON();
    expect(tree).toMatchSnapshot();
  });




});
