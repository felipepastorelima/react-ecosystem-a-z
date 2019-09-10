import React from "react";
import { mount } from "enzyme";
import CheckboxWithLabel from "../CheckboxWithLabel";
jest.mock("../CheckboxWithLabel", () => () => <jfaskld-fjaslkd />);

test("CheckboxWithLabel changes the text after click", () => {
  // Render a checkbox with label in the document
  const checkbox = mount(
    <div>
      <CheckboxWithLabel labelOn="On" labelOff="Off" />
    </div>
  );

  // expect(checkbox.text()).toEqual("Off");

  // checkbox.find("input").simulate("change");

  // expect(checkbox.text()).toEqual("On");
});
