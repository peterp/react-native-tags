import React from "react";
import renderer from "react-test-renderer";
import { Text } from "react-native";

import Tags from "../../";

describe("Tags", () => {
  const noop = function() {};

  it("should render props correctly", () => {
    const tree = renderer
      .create(
        <Tags
          initialText="monkey gland sauce"
          initialTags={["tomato sauce", "mustard", "mayo"]}
          onChangeTags={noop}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("renderTag prop", () => {
    it("allows me to render a custom tag with a function", () => {
      const renderTag = jest.fn(({ tag }) => <Text key={tag}>{tag}</Text>);

      const tree = renderer
        .create(
          <Tags
            initialText=""
            initialTags={["palm", "oil", "sucks"]}
            onChangeTags={noop}
            renderTag={renderTag}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("textInputProps", () => {
    const tree = renderer
      .create(
        <Tags
          initialText="monkey gland sauce"
          textInputProps={{ placeholder: "testy text" }}
          initialTags={["tomato sauce", "mustard", "mayo"]}
          onChangeTags={noop}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
