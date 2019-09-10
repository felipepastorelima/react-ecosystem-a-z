import React, { Suspense, Component } from "react";
import { shallow } from "enzyme";
import PropTypes from "prop-types";

const ThemeContext = React.createContext({ theme: "light" });

class ThemeComponent extends Component {
  render() {
    return (
      <ThemeContext.Provider value={{ theme: "dark" }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

class CustomComponent extends Component {
  state = {
    authenticated: false
  };

  componentDidMount() {
    this.setState({ authenticated: true });
  }

  render() {
    return (
      <div>
        <div id="theme">
          <ThemeContext.Consumer>
            {value => String(value.theme)}
          </ThemeContext.Consumer>
        </div>
        <div id="user">{this.state.authenticated ? "User" : "Guest"}</div>
      </div>
    );
  }
}

describe("options", () => {
  test("context", () => {
    function SimpleComponent(props, context) {
      const { name } = context;
      return <div>{name}</div>;
    }

    SimpleComponent.contextTypes = {
      name: PropTypes.string
    };

    const context = { name: "foo" };
    const wrapper = shallow(<SimpleComponent />, { context });
    expect(wrapper.text()).toEqual("foo");
  });

  test("disableLifecycleMethods", () => {
    const wrapper = shallow(<CustomComponent></CustomComponent>, {
      disableLifecycleMethods: true
    });

    expect(wrapper.find("#user").text()).toBe("Guest");
  });

  test("wrappingComponent", () => {
    const wrapper = shallow(<CustomComponent></CustomComponent>, {
      wrappingComponent: ThemeComponent
    });

    expect(wrapper.getWrappingComponent().html()).toMatchInlineSnapshot(
      `"<div><div id=\\"theme\\">dark</div><div id=\\"user\\">Guest</div></div>"`
    );
  });

  test("suspenseFallback", () => {
    const LazyComponent = React.lazy(() => import("../../LazyComponent"));

    const wrapper = shallow(
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>,
      { suspenseFallback: true }
    );

    expect(wrapper).toMatchInlineSnapshot(`
      <div>
        Loading...
      </div>
    `);
  });
});
