import { render } from "enzyme";
import React from "react";
import PropTypes from "prop-types";

const Foo = props => (
  <div>
    <h1>{props.title}</h1>
    <div className="foo-bar"></div>
    <div className="foo-bar"></div>
    <div className="foo-bar"></div>
  </div>
);

describe("<Foo />", () => {
  it("renders three `.foo-bar`s", () => {
    const wrapper = render(<Foo />);
    expect(wrapper.find(".foo-bar")).toHaveLength(3);
  });

  it("rendered the title", () => {
    const wrapper = render(<Foo title="unique" />);
    expect(wrapper.text()).toContain("unique");
  });

  it("renders a div", () => {
    const wrapper = render(<Foo />);
    expect(wrapper.html()).toMatch(/div/);
  });

  it("can pass in context", () => {
    function SimpleComponent(props, context) {
      const { name } = context;
      return <div>{name}</div>;
    }
    SimpleComponent.contextTypes = {
      name: PropTypes.string
    };

    const context = { name: "foo" };
    const wrapper = render(<SimpleComponent />, { context });
    expect(wrapper.text()).toEqual("foo");
  });
});
