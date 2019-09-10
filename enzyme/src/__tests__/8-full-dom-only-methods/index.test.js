import React from "react";
import { mount } from "enzyme";
import PropTypes from "prop-types";

test("detach()", () => {
  function CustomComponent(props) {
    return <div>Custom Component</div>;
  }

  document.body.innerHTML = `<div id="root"></div>`;
  const attachHere = document.getElementById("root");

  const wrapper = mount(<CustomComponent></CustomComponent>, {
    attachTo: attachHere
  });

  expect(document.body.innerHTML).toMatchInlineSnapshot(
    `"<div id=\\"root\\"><div>Custom Component</div></div>"`
  );

  wrapper.detach();

  expect(document.body.innerHTML).toMatchInlineSnapshot(
    `"<div id=\\"root\\"></div>"`
  );
});

test("getDOMNode()", () => {
  const wrapper = mount(<div className="foo"></div>);
  const domNode = wrapper.getDOMNode();
  expect(domNode).toHaveProperty("className");
});

test("mount() and unmount()", () => {
  const willMount = jest.fn();
  const didMount = jest.fn();
  const willUnmount = jest.fn();

  class Foo extends React.Component {
    constructor(props) {
      super(props);
      this.componentWillUnmount = willUnmount;
      this.componentWillMount = willMount;
      this.componentDidMount = didMount;
    }

    render() {
      const { id } = this.props;
      return <div className={id}>{id}</div>;
    }
  }

  Foo.propTypes = {
    id: PropTypes.string.isRequired
  };

  const wrapper = mount(<Foo id="foo" />);

  expect(willMount).toHaveBeenCalled();
  expect(didMount).toHaveBeenCalled();
  expect(willUnmount).not.toHaveBeenCalled();

  wrapper.unmount();
  expect(willMount).toHaveBeenCalledTimes(1);
  expect(didMount).toHaveBeenCalledTimes(1);
  expect(willUnmount).toHaveBeenCalledTimes(1);

  wrapper.mount();
  expect(willMount).toHaveBeenCalledTimes(2);
  expect(didMount).toHaveBeenCalledTimes(2);
  expect(willUnmount).toHaveBeenCalledTimes(1);
});

test("ref(refName)", () => {
  class Foo extends React.Component {
    render() {
      return (
        <div>
          <span ref="firstRef">First</span>
          <span ref="secondRef">Second</span>
          <span ref="thirdRef">Third</span>
        </div>
      );
    }
  }

  const wrapper = mount(<Foo />);
  expect(wrapper.ref("secondRef").innerHTML).toBe("Second");
});
