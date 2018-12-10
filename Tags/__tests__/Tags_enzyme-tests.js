import React from "react";
import enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Tags from "../../";

enzyme.configure({ adapter: new Adapter() });

describe("Tags", () => {
  describe("tags", () => {
    it("removes a tag when you press them", () => {
      const wrapper = shallow(
        <Tags initialTags={["this", "is", "a", "test"]} />
      );

      wrapper
        .find("Tag")
        .at(1)
        .simulate("press");

      expect(wrapper.find("Tag").length).toEqual(3);
    });

    it("doesn't remove tags when they're readonly", () => {
      const wrapper = shallow(
        <Tags
          deleteTagOnPress={false}
          initialTags={["this", "is", "a", "test"]}
        />
      );

      wrapper
        .find("Tag")
        .at(0)
        .simulate("press");

      expect(wrapper.find("Tag").length).toEqual(4);
    });
  });

  describe("TextInput", () => {
    describe("onChangeText", () => {
      it("should add a new tag when a space, or comma is detected", () => {
        const onChangeTags = jest.fn();
        const wrapper = shallow(<Tags onChangeTags={onChangeTags} />).find(
          "TextInput"
        );
        wrapper.simulate("ChangeText", "dog ");
        expect(onChangeTags.mock.calls).toEqual([[["dog"]]]);
        wrapper.simulate("ChangeText", "cat,");
        expect(onChangeTags.mock.calls).toEqual([[["dog"]], [["dog", "cat"]]]);
      });

      it("should add a new tag when return is pressed", () => {
        const onChangeTags = jest.fn();
        const wrapper = shallow(
          <Tags createTagOnReturn onChangeTags={onChangeTags} />
        ).find("TextInput");
        wrapper.simulate("ChangeText", "dog");
        wrapper.simulate("SubmitEditing");
        expect(onChangeTags.mock.calls).toEqual([[["dog"]]]);
      });

      it("should remove a tag when the text is empty", () => {
        const onChangeTags = jest.fn();
        const wrapper = shallow(<Tags onChangeTags={onChangeTags} />).find(
          "TextInput"
        );
        wrapper.simulate("ChangeText", "dog ");
        expect(onChangeTags.mock.calls).toEqual([[["dog"]]]);
        wrapper.simulate("ChangeText", "");
        expect(onChangeTags.mock.calls).toEqual([[["dog"]], [[]]]);
      });

      it("text input should not be available if it's readyonly", () => {
        const wrapper = shallow(<Tags readonly />).find("TextInput");
        expect(wrapper.length).toEqual(0);
      });

      it("textinput should dissapear after maxNumberOfTags is reached", () => {
        const wrapper = shallow(
          <Tags initialTags={["love"]} maxNumberOfTags={2} />
        );
        wrapper.find("TextInput").simulate("ChangeText", "dog ");
        expect(wrapper.find("TextInput").length).toEqual(0);
      });
    });
  });
});
