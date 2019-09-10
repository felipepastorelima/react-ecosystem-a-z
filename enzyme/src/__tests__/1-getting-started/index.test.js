import React, { Component } from "react";
import { shallow } from "enzyme";

class CustomComponent extends Component {
  render() {
    return <div></div>;
  }
}

test("getting started", () => {
  const wrapper = shallow(<CustomComponent />);
  expect(wrapper).toMatchInlineSnapshot(`<div />`);
});
