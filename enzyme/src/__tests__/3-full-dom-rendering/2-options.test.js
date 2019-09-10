import React, { Component } from "react";
import { mount } from "enzyme";
import PropTypes from "prop-types";

const ThemeContext = React.createContext({ theme: "light" });

class ThemeComponent extends Component {
  render() {
    return (
      <ThemeContext.Provider value={{ theme: this.props.theme || "dark" }}>
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
    const wrapper = mount(<SimpleComponent />, { context });
    expect(wrapper.text()).toEqual("foo");
  });

  test("wrappingComponent", () => {
    const wrapper = mount(<CustomComponent></CustomComponent>, {
      wrappingComponent: ThemeComponent,
      wrappingComponentProps: { theme: "custom" }
    });

    expect(wrapper.getWrappingComponent().html()).toMatchInlineSnapshot(
      `"<div><div id=\\"theme\\">custom</div><div id=\\"user\\">User</div></div>"`
    );
  });

  test("attachTo", () => {
    document.body.innerHTML = `<div id="attach-here"></div><div id="not-here"></div>`;
    const attachHere = document.getElementById("attach-here");

    mount(<CustomComponent></CustomComponent>, {
      attachTo: attachHere
    });

    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<div id=\\"attach-here\\"><div><div id=\\"theme\\">light</div><div id=\\"user\\">User</div></div></div><div id=\\"not-here\\"></div>"`
    );
  });
});
