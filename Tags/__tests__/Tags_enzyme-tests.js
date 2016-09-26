import React from 'react';
import { shallow } from 'enzyme';
import Tags from '../../';

describe('Tags', () => {
  describe('TextInput', () => {
    describe('onChangeText', () => {
      it('should add a new tag when a space, or comma is detected', () => {
        const onChangeTags = jest.fn();
        const wrapper = shallow(<Tags onChangeTags={onChangeTags} />)
        .find('TextInput');
        wrapper.simulate('ChangeText', 'dog ');
        expect(onChangeTags.mock.calls).toEqual([[[ 'dog' ]]]);
        wrapper.simulate('ChangeText', 'cat,');
        expect(onChangeTags.mock.calls).toEqual([
          [[ 'dog' ]],
          [[ 'dog', 'cat' ]],
        ]);
      });

      it('should remove a tag when the text is empty', () => {
        const onChangeTags = jest.fn();
        const wrapper = shallow(<Tags onChangeTags={onChangeTags} />)
        .find('TextInput');
        wrapper.simulate('ChangeText', 'dog ');
        expect(onChangeTags.mock.calls).toEqual([[[ 'dog' ]]]);
        wrapper.simulate('ChangeText', '');
        expect(onChangeTags.mock.calls).toEqual([
          [[ 'dog' ]],
          [[]],
        ]);
      });
    });
  });
});
