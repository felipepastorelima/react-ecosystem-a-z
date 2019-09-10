import React from "react";
import Intro from "../Intro";

import renderer from "react-test-renderer";

jest.mock("react-native-video", () => "Video");

jest.mock("Text", () => {
  const RealComponent = jest.requireActual("Text");
  const React = require("React");
  class Text extends React.Component {
    render() {
      return React.createElement("Text", this.props, <div>Mock</div>);
    }
  }
  Text.propTypes = RealComponent.propTypes;
  return Text;
});

test("renders correctly", () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});
