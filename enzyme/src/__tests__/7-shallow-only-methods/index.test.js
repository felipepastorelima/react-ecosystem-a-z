import React from "react";
import { shallow } from "enzyme";

test("shallow", () => {
  class Bar extends React.Component {
    state = {
      value: 0
    };

    componentDidMount() {
      this.setState({
        value: 1
      });
    }

    render() {
      return (
        <div>
          <div className="in-bar">{this.state.value}</div>
        </div>
      );
    }
  }

  function Foo() {
    return (
      <div>
        <Bar />
      </div>
    );
  }

  const wrapper = shallow(<Foo />);

  expect(wrapper.find(".in-bar")).toHaveLength(0);
  expect(wrapper.find(Bar)).toHaveLength(1);

  const barWithLifecycle = wrapper.find(Bar).shallow();
  expect(barWithLifecycle.find(".in-bar")).toHaveLength(1);
  expect(barWithLifecycle.find(".in-bar").text()).toBe("1");

  const barWithoutLifecycle = wrapper.find(Bar).shallow({
    disableLifecycleMethods: true
  });
  expect(barWithoutLifecycle.find(".in-bar")).toHaveLength(1);
  expect(barWithoutLifecycle.find(".in-bar").text()).toBe("0");
});

test("dive", () => {
  function Bar() {
    return (
      <div>
        <div className="in-bar" />
      </div>
    );
  }

  function Foo() {
    return (
      <div>
        <Bar />
      </div>
    );
  }

  const wrapper = shallow(<Foo />);
  expect(wrapper.find(".in-bar")).toHaveLength(0);
  expect(wrapper.find(Bar)).toHaveLength(1);
  expect(
    wrapper
      .find(Bar)
      .dive()
      .find(".in-bar")
  ).toHaveLength(1);
});
