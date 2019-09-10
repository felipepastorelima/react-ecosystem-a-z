import { mount } from "enzyme";
import React from "react";

function Foo(props) {
  return (
    <div>
      <button
        id="foo-button"
        onClick={() => props.onButtonClick && props.onButtonClick()}
      />
    </div>
  );
}

function MyComponent(props) {
  return (
    <div>
      <Foo anum={3} abool={false} />
      <Foo anum="3" abool="false" />
      <Foo id="foo-id" abool={undefined} />
      <div className="icon-star"></div>
      <a href="foo">Foo</a>
      {[1, 2, 3].map(item => (
        <div key={item}>{item}</div>
      ))}
      {props.children}
    </div>
  );
}

MyComponent.displayName = "My Component";

let wrapper;

beforeEach(() => {
  wrapper = mount(<MyComponent />);
});

afterEach(() => {
  wrapper.unmount();
});

test(".icon-start", () => {
  expect(wrapper.find(".icon-star")).toHaveLength(1);
});

test("button#foo-button", () => {
  expect(wrapper.find("button#foo-button")).toHaveLength(3);
});

test("a[href=foo]", () => {
  expect(wrapper.find(`a[href="foo"]`)).toHaveLength(1);
});

test("a[href=foo]", () => {
  expect(wrapper.find(`a[href="foo"]`)).toHaveLength(1);
});

test("#foo-id *", () => {
  expect(wrapper.find(`#foo-id *`)).toHaveLength(2);
});

test("key doesn't work", () => {
  expect(wrapper.find(`[key=1]`)).toHaveLength(0);
});

test("ref doesn't work", () => {
  class SimpleComponent extends React.Component {
    render() {
      return <div ref="foo">Ref</div>;
    }
  }

  const wrapper = mount(<SimpleComponent />);
  expect(wrapper.find(`[ref="foo"]`)).toHaveLength(0);
});

test("Foo", () => {
  expect(wrapper.find(Foo)).toHaveLength(3);
});

test.skip("My Component", () => {
  expect(wrapper.find("My Component")).toHaveLength(1);
});

test("anum={3} abool={false}", () => {
  expect(wrapper.find("[anum=3][abool=false]")).toHaveLength(1);

  expect(
    wrapper.find({
      anum: 3,
      abool: false
    })
  ).toHaveLength(1);
});

test(`anum="3" abool="false"`, () => {
  expect(wrapper.find(`[anum="3"][abool="false"]`)).toHaveLength(1);

  expect(
    wrapper.find({
      anum: "3",
      abool: "false"
    })
  ).toHaveLength(1);
});

test(`abool={undefined}`, () => {
  // wont work
  // expect(
  //   wrapper.find({
  //     aundefined: undefined
  //   })
  // ).toHaveLength(1);
  expect(
    wrapper.findWhere(n => n.is(Foo) && n.props().abool === undefined)
  ).toHaveLength(1);
});
