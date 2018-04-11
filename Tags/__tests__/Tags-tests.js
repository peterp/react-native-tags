import React from "react";
import renderer from "react-test-renderer";
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
});
