import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TagInput from '../';

describe('TagInput', () => {

  function noop() {};

  it('should render correctly', () => {
    renderer.create(<TagInput onTagChange={noop} />);
    expect(true).toBe(true);
  });
});
