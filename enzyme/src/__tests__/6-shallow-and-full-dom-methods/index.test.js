import { mount, shallow } from "enzyme";
import React from "react";
import PropTypes from "prop-types";

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
    <div id="root">
      <div className="parent">
        <Foo anum={3} abool={false} />
        <Foo anum="3" abool="false" />
        <Foo id="foo-id" abool={undefined} />
        <div className="icon-star"></div>
        <a href="foo">Foo</a>
        <div id="list">
          {[1, 2, 3].map(item => (
            <div id="list-item" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="parent">{props.children}</div>
    </div>
  );
}

MyComponent.displayName = "My Component";

test("at(index)", () => {
  const wrapper = mount(<MyComponent />);
  expect(wrapper.find(Foo).at(2)).toMatchInlineSnapshot(`
    <Foo
      id="foo-id"
    >
      <div>
        <button
          id="foo-button"
          onClick={[Function]}
        />
      </div>
    </Foo>
  `);
});

test("childAt()", () => {
  const wrapper = mount(<MyComponent />);
  expect(
    wrapper
      .find(".parent")
      .first()
      .childAt(2)
  ).toMatchInlineSnapshot(`
    <Foo
      id="foo-id"
    >
      <div>
        <button
          id="foo-button"
          onClick={[Function]}
        />
      </div>
    </Foo>
  `);
});

test("children()", () => {
  const wrapper = mount(<MyComponent />);
  expect(wrapper.find("#list").children()).toHaveLength(3);
});

test("closest(selector)", () => {
  const wrapper = mount(<MyComponent />);
  expect(
    wrapper
      .find(Foo)
      .first()
      .closest(".parent")
      .children()
  ).toHaveLength(6);
});

test("contains(nodeOrNodes)", () => {
  const wrapper = shallow(
    <div>
      <span>Hello</span>
      <div>Goodbye</div>
      <span>Again</span>
    </div>
  );

  expect(wrapper.contains([<span>Hello</span>, <div>Goodbye</div>])).toEqual(
    true
  );

  expect(wrapper.contains([<span>Hello</span>, <div>World</div>])).toEqual(
    false
  );
});

test("containsMatchingElement(node)", () => {
  const wrapper = shallow(
    <div>
      <div data-foo="foo" data-bar="bar">
        Hello
      </div>
    </div>
  );

  expect(
    wrapper.containsMatchingElement(
      <div data-foo="foo" data-bar="bar">
        Hello
      </div>
    )
  ).toBe(true);

  expect(wrapper.containsMatchingElement(<div data-foo="foo">Hello</div>)).toBe(
    true
  );

  expect(
    wrapper.containsMatchingElement(
      <div data-foo="foo" data-bar="bar" data-baz="baz">
        Hello
      </div>
    )
  ).toBe(false);

  expect(
    wrapper.containsMatchingElement(
      <div data-foo="foo" data-bar="Hello">
        Hello
      </div>
    )
  ).toBe(false);

  expect(
    wrapper.containsMatchingElement(<div data-foo="foo" data-bar="bar" />)
  ).toBe(false);
});

test("containsAllMatchingElements(nodes)", () => {
  const style = { fontSize: 13 };
  const wrapper = shallow(
    <div>
      <span className="foo">Hello</span>
      <div style={style}>Goodbye</div>
      <span>Again</span>
    </div>
  );

  expect(
    wrapper.containsAllMatchingElements([
      <span>Hello</span>,
      <div>Goodbye</div>
    ])
  ).toBe(true);
});

test("containsAnyMatchingElements(nodes)", () => {
  const style = { fontSize: 13 };
  const wrapper = shallow(
    <div>
      <span className="foo">Hello</span>
      <div style={style}>Goodbye</div>
      <span>Again</span>
    </div>
  );

  expect(
    wrapper.containsAnyMatchingElements([
      <span>Bonjour</span>,
      <div>Goodbye</div>
    ])
  ).toBe(true);
});

test.skip("context([key])", () => {
  const wrapper = shallow(<MyComponent />, { context: { foo: 10 } });
  expect(wrapper.context().foo).toEqual(10);
  expect(wrapper.context("foo")).toEqual(10);
});

test("debug()", () => {
  function NumberOfPages(props) {
    return <div />;
  }

  function Book({ title, pages }) {
    return (
      <div>
        <h1 className="title">{title}</h1>
        {pages && <NumberOfPages pages={pages} object={{ a: 1, b: 2 }} />}
      </div>
    );
  }

  let wrapper = shallow(<Book title="Huckleberry Finn" />);
  console.log(wrapper.debug());

  wrapper = shallow(<Book title="Huckleberry Finn" pages="633 pages" />);
  console.log(wrapper.debug());

  console.log(wrapper.debug({ ignoreProps: true }));

  console.log(wrapper.debug({ verbose: true }));
});

test("equals(node)", () => {
  const wrapper = mount(<MyComponent />);
  expect(
    wrapper
      .find(Foo)
      .first()
      .equals(<Foo anum={3} abool={false} anundefined={undefined} />)
  ).toBe(true);
});

test("every(selector)", () => {
  const wrapper = shallow(
    <div>
      <div className="foo qoo" />
      <div className="foo boo" />
      <div className="foo hoo" />
    </div>
  );
  expect(wrapper.find(".foo").every(".foo")).toBe(true);
  expect(wrapper.find(".foo").every(".qoo")).toBe(false);
  expect(wrapper.find(".foo").every(".bar")).toBe(false);
});

test("everyWhere(predicate)", () => {
  const wrapper = shallow(
    <div>
      <div className="foo qoo" />
      <div className="foo boo" />
      <div className="foo hoo" />
    </div>
  );

  expect(wrapper.find(".foo").everyWhere(n => n.hasClass("foo"))).toBe(true);
  expect(wrapper.find(".foo").everyWhere(n => n.hasClass("qoo"))).toEqual(
    false
  );
  expect(wrapper.find(".foo").everyWhere(n => n.hasClass("bar"))).toEqual(
    false
  );
});

test("exists([selector])", () => {
  const wrapper = mount(<div className="some-class" />);
  expect(wrapper.exists(".some-class")).toBe(true);
  expect(wrapper.find(".other-class").exists()).toBe(false);
});

test("filter(selector)", () => {
  const wrapper = mount(<MyComponent />);
  expect(wrapper.find(Foo).filter("#foo-id")).toHaveLength(1);
});

test("filterWhere(predicate)", () => {
  const wrapper = mount(<MyComponent />);
  expect(wrapper.find(Foo).filterWhere(n => n.is("#foo-id"))).toHaveLength(1);
});

test("find(selector)", () => {
  const wrapper = mount(<MyComponent />);
  expect(wrapper.find(Foo)).toHaveLength(3);
});

test("findWhere(predicate)", () => {
  const wrapper = mount(<MyComponent />);
  expect(wrapper.findWhere(n => n.is(Foo))).toHaveLength(3);
});

test("first()", () => {
  const wrapper = mount(<MyComponent />);
  expect(
    wrapper
      .find(Foo)
      .first()
      .equals(<Foo anum={3} abool={false} anundefined={undefined} />)
  ).toBe(true);
});

test("forEach(fn)", () => {
  const wrapper = shallow(
    <div>
      <div className="foo bax" />
      <div className="foo bar" />
      <div className="foo baz" />
    </div>
  );

  wrapper.find(".foo").forEach(node => {
    expect(node.hasClass("foo")).toBe(true);
  });
});

test("get(index)", () => {
  const wrapper = mount(<MyComponent />);
  expect(wrapper.find(Foo).get(0).props.anum).toBe(3);
});

test("getWrappingComponent()", () => {
  // Ver src/__tests__/3-full-dom-rendering/2-options.test.js linha 58
});

test("getElement(index)", () => {
  const element = (
    <div>
      <span />
      <span />
    </div>
  );

  function MyComponent() {
    return element;
  }

  const wrapper = shallow(<MyComponent />);
  expect(wrapper.getElement()).toEqual(element);
});

test("getElements(index)", () => {
  const one = <span />;
  const two = <span />;

  function Test() {
    return (
      <div>
        {one}
        {two}
      </div>
    );
  }

  const wrapper = shallow(<Test />);
  expect(wrapper.find("span").getElements()).toEqual([one, two]);
});

test("hasClass(className)", () => {
  const wrapper = shallow(<MyComponent />);
  expect(
    wrapper
      .find("#root")
      .childAt(0)
      .hasClass("parent")
  ).toBe(true);
});

test("hostNodes()", () => {
  const wrapper = shallow(
    <div>
      <MyComponent className="foo" />
      <span className="foo" />
    </div>
  );
  const twoNodes = wrapper.find(".foo");
  expect(twoNodes.hostNodes()).toHaveLength(1);
});

test("html()", () => {
  function Foo() {
    return <div className="in-foo" />;
  }

  function Bar() {
    return (
      <div className="in-bar">
        <Foo />
      </div>
    );
  }

  let wrapper = shallow(<Bar />);
  expect(wrapper.html()).toBe(
    '<div class="in-bar"><div class="in-foo"></div></div>'
  );

  expect(wrapper.find(Foo).html()).toBe('<div class="in-foo"></div>');

  wrapper = shallow(
    <div>
      <b>important</b>
    </div>
  );

  expect(wrapper.html()).toBe("<div><b>important</b></div>");
});

describe("instance()", () => {
  function Stateless() {
    return <div>Stateless</div>;
  }

  class Stateful extends React.Component {
    state = {
      value: true
    };

    render() {
      return <div>Stateful</div>;
    }
  }

  test("shallow wrapper instance should be null", () => {
    const wrapper = shallow(<Stateless />);
    const instance = wrapper.instance();

    expect(instance).toBe(null);
  });

  test("shallow wrapper instance should not be null", () => {
    const wrapper = shallow(<Stateful />);
    const instance = wrapper.instance();

    expect(instance).toBeInstanceOf(Stateful);
    expect(instance.state.value).toBe(true);
  });
});

test("invoke(propName)", () => {
  class Foo extends React.Component {
    state = {
      loaded: false
    };

    loadData() {
      return new Promise(resolve => {
        this.setState({ loaded: true });
        resolve();
      });
    }

    render() {
      return (
        <div>
          <button type="button" onClick={() => this.loadData()}>
            Load more
          </button>
        </div>
      );
    }
  }

  const wrapper = shallow(<Foo />);

  expect(wrapper.instance().state.loaded).toBe(false);

  return wrapper
    .find("button")
    .invoke("onClick")(null)
    .then(() => {
      expect(wrapper.instance().state.loaded).toBe(true);
    });
});

test("is(selector)", () => {
  const wrapper = shallow(<div className="some-class other-class" />);
  expect(wrapper.is(".some-class")).toBe(true);
});

test("isEmpty()", () => {
  const wrapper = shallow(<div className="some-class" />);
  expect(wrapper.find(".other-class").isEmpty()).toBe(true);
});

test("isEmptyRender()", () => {
  function Foo() {
    return null;
  }

  const wrapper = shallow(<Foo />);
  expect(wrapper.isEmptyRender()).toBe(true);
});

test("key()", () => {
  const wrapper = shallow(
    <ul>
      {["foo", "bar"].map(s => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  ).find("li");

  expect(wrapper.at(0).key()).toBe("foo");
  expect(wrapper.at(1).key()).toBe("bar");
});

test("last()", () => {
  const wrapper = mount(<MyComponent />);
  expect(
    wrapper
      .find(Foo)
      .last()
      .equals(<Foo id="foo-id" abool={undefined} />)
  ).toBe(true);
});

test("map(fn)", () => {
  const wrapper = shallow(
    <div>
      <div className="foo">bax</div>
      <div className="foo">bar</div>
      <div className="foo">baz</div>
    </div>
  );

  const texts = wrapper.find(".foo").map(node => node.text());
  expect(texts).toEqual(["bax", "bar", "baz"]);
});

test("matchesElement(node)", () => {
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      // ...
    }

    render() {
      return (
        <button type="button" onClick={this.handleClick} className="foo bar">
          Hello
        </button>
      );
    }
  }

  const wrapper = shallow(<MyComponent />);
  expect(wrapper.matchesElement(<button>Hello</button>)).toBe(true);
  expect(
    wrapper.matchesElement(<button className="foo bar">Hello</button>)
  ).toBe(true);
});

test("name()", () => {
  function Foo() {
    return <div></div>;
  }

  let wrapper = shallow(<div />);
  expect(wrapper.name()).toBe("div");

  function SomeWrappingComponent() {
    return <Foo />;
  }
  wrapper = shallow(<SomeWrappingComponent />);
  expect(wrapper.name()).toBe("Foo");

  Foo.displayName = "A cool custom name";
  function SomeWrappingComponent() {
    return <Foo />;
  }

  wrapper = shallow(<SomeWrappingComponent />);
  expect(wrapper.name()).toBe("A cool custom name");
});

test("not(selector)", () => {
  const wrapper = shallow(<MyComponent />);
  expect(wrapper.find(Foo).not("#foo-id")).toHaveLength(2);
});

test("parent()", () => {
  const wrapper = shallow(<MyComponent />);
  expect(
    wrapper
      .find("Foo")
      .first()
      .parent()
      .is("div")
  ).toBe(true);
});

test("parents()", () => {
  const wrapper = shallow(<MyComponent />);
  const parents = wrapper
    .find("Foo")
    .first()
    .parents();
  expect(parents.at(0).is(".parent")).toBe(true);
  expect(parents.at(1).is("#root")).toBe(true);
});

describe("prop(key)", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MyComponent />);
  });

  const ValidateNumberInputComponent = props => <div></div>;

  class MyComponent extends React.Component {
    constructor(...args) {
      super(...args);

      this.state = {
        number: 0
      };

      this.onValidNumberInput = this.onValidNumberInput.bind(this);
    }

    onValidNumberInput(number) {
      if (!number || typeof number === "number") {
        this.setState({ number });
      }
    }

    render() {
      const { includedProp } = this.props;
      const { number } = this.state;
      return (
        <div className="foo bar" includedProp={includedProp}>
          <ValidateNumberInputComponent
            onChangeHandler={n => this.onValidNumberInput(n)}
            number={number}
          />
        </div>
      );
    }
  }
  MyComponent.propTypes = {
    includedProp: PropTypes.string.isRequired
  };

  test("", () => {
    const wrapper = shallow(
      <MyComponent includedProp="Success!" excludedProp="I'm not included" />
    );

    expect(wrapper.prop("includedProp")).toEqual("Success!");

    console.log(wrapper.prop("includedProp"));
    // "Success!"
    console.log(wrapper.prop("excludedProp"));
    // undefined
    console.log(wrapper.instance().props.excludedProp);
    // "I'm not included"
  });

  test("valid", () => {
    const validInput = 1;
    wrapper.find("ValidateNumberInputComponent").prop("onChangeHandler")(
      validInput
    );
    expect(wrapper.state("number")).toEqual(validInput);
  });

  test("invalid", () => {
    const invalidInput = "invalid input";
    wrapper.find("ValidateNumberInputComponent").prop("onChangeHandler")(
      invalidInput
    );
    expect(wrapper.state("number")).toEqual(0);
  });
});

test("props()", () => {
  function MyComponent(props) {
    const { includedProp } = props;
    return (
      <div className="foo bar" includedProp={includedProp}>
        Hello
      </div>
    );
  }
  MyComponent.propTypes = {
    includedProp: PropTypes.string.isRequired
  };

  const wrapper = shallow(
    <MyComponent includedProp="Success!" excludedProp="I'm not included" />
  );

  // Warning: .props() only returns props that are passed to the root node,
  // which does not include excludedProp in this example.

  expect(wrapper.props()).toEqual({
    children: "Hello",
    className: "foo bar",
    includedProp: "Success!"
  });
});

test("reduce(fn[, initialValue])", () => {
  function Bar(props) {
    return <div>{props.amount}</div>;
  }

  function Foo() {
    return (
      <div>
        <Bar amount={2} />
        <Bar amount={4} />
        <Bar amount={8} />
      </div>
    );
  }

  const wrapper = shallow(<Foo />);

  const total = wrapper
    .find(Bar)
    .reduce((amount, n) => amount + n.prop("amount"), 0);

  expect(total).toBe(14);
});

test("reduceRight(fn[, initialValue])", () => {
  function Bar(props) {
    return <div>{props.amount}</div>;
  }

  function Foo() {
    return (
      <div>
        <Bar amount={2} />
        <Bar amount={4} />
        <Bar amount={8} />
      </div>
    );
  }

  const wrapper = shallow(<Foo />);

  const total = wrapper
    .find(Bar)
    .reduce((amount, n) => amount + n.prop("amount"), 0);

  expect(total).toBe(14);
});

test("render()", () => {
  function Foo() {
    return <div className="in-foo" />;
  }

  function Bar() {
    return (
      <div className="in-bar">
        <Foo />
      </div>
    );
  }

  const wrapper = shallow(<Bar />);
  expect(wrapper.find(".in-foo")).toHaveLength(0);
  expect(
    wrapper
      .find(Foo)
      .render()
      .filter(".in-foo")
  ).toHaveLength(1);
});

test("renderProp(key)", () => {
  class Mouse extends React.Component {
    constructor() {
      super();
      this.state = { x: 0, y: 0 };
    }

    render() {
      const { render } = this.props;
      return (
        <div
          style={{ height: "100%" }}
          onMouseMove={event => {
            this.setState({
              x: event.clientX,
              y: event.clientY
            });
          }}
        >
          {render(this.state)}
        </div>
      );
    }
  }

  Mouse.propTypes = {
    render: PropTypes.func.isRequired
  };

  const App = () => (
    <div style={{ height: "100%" }}>
      <Mouse
        render={(x = 0, y = 0) => (
          <h1>
            The mouse position is ({x}, {y})
          </h1>
        )}
      />
    </div>
  );

  let wrapper = shallow(<App />)
    .find(Mouse)
    .renderProp("render")();

  expect(wrapper.equals(<h1>The mouse position is (0, 0)</h1>)).toEqual(true);

  wrapper = shallow(<App />)
    .find(Mouse)
    .renderProp("render")(10, 20);

  expect(wrapper).toMatchInlineSnapshot(`
    <h1>
      The mouse position is (
      10
      , 
      20
      )
    </h1>
  `);

  expect(wrapper.equals(<h1>The mouse position is (10, 20)</h1>)).toEqual(true);
});

test("setContext(context)", () => {
  function SimpleComponent(props, context) {
    const { name } = context;
    return <div>{name}</div>;
  }

  SimpleComponent.contextTypes = {
    name: PropTypes.string
  };

  const context = { name: "foo" };
  const wrapper = shallow(<SimpleComponent />, { context });
  expect(wrapper.text()).toBe("foo");
  wrapper.setContext({ name: "bar" });
  expect(wrapper.text()).toBe("bar");
  wrapper.setContext({ name: "baz" });
  expect(wrapper.text()).toBe("baz");
});

test("setProps(nextProps)", () => {
  class Foo extends React.Component {
    componentWillReceiveProps(props) {
      // ...
    }

    render() {
      return <div className={this.props.name} />;
    }
  }

  Foo.propTypes = {
    name: PropTypes.string.isRequired
  };

  let wrapper = shallow(<Foo name="foo" />);
  expect(wrapper.find(".foo")).toHaveLength(1);
  expect(wrapper.find(".bar")).toHaveLength(0);
  wrapper.setProps({ name: "bar" });
  expect(wrapper.find(".foo")).toHaveLength(0);
  expect(wrapper.find(".bar")).toHaveLength(1);

  wrapper = shallow(<Foo name="foo" />);
  const spy = jest.spyOn(wrapper.instance(), "componentWillReceiveProps");
  expect(spy).not.toHaveBeenCalled();
  wrapper.setProps({ name: "bar" });
  expect(spy).toHaveBeenCalled();
});

test("setState(nextState[, callback])", () => {
  class Foo extends React.Component {
    constructor(props) {
      super(props);
      this.state = { name: "foo" };
    }

    render() {
      const { name } = this.state;
      return <div className={name} />;
    }
  }

  const wrapper = shallow(<Foo />);
  expect(wrapper.find(".foo")).toHaveLength(1);
  expect(wrapper.find(".bar")).toHaveLength(0);
  wrapper.setState({ name: "bar" });
  expect(wrapper.find(".foo")).toHaveLength(0);
  expect(wrapper.find(".bar")).toHaveLength(1);
});

test("simulate(event[, data])", () => {
  class Foo extends React.Component {
    constructor(props) {
      super(props);
      this.state = { count: 0 };
    }

    render() {
      const { count } = this.state;
      return (
        <div>
          <div className={`clicks-${count}`}>{count} clicks</div>
          <a
            href="url"
            onClick={() => {
              this.setState({ count: count + 1 });
            }}
          >
            Increment
          </a>
        </div>
      );
    }
  }

  const wrapper = shallow(<Foo />);

  expect(wrapper.find(".clicks-0").length).toBe(1);
  wrapper.find("a").simulate("click");
  expect(wrapper.find(".clicks-1").length).toBe(1);
});

test("simulateError(error)", () => {
  function Something() {
    // this is just a placeholder
    return null;
  }

  class ErrorBoundary extends React.Component {
    static getDerivedStateFromError(error) {
      return {
        hasError: true
      };
    }

    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
      const { spy } = this.props;
      spy(error, info);
    }

    render() {
      const { children } = this.props;
      const { hasError } = this.state;
      return <React.Fragment>{hasError ? "Error" : children}</React.Fragment>;
    }
  }
  ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    spy: PropTypes.func.isRequired
  };

  const spy = jest.fn();
  const wrapper = shallow(
    <ErrorBoundary spy={spy}>
      <Something />
    </ErrorBoundary>
  );
  const error = new Error("hi!");
  wrapper.find(Something).simulateError(error);

  expect(wrapper.state()).toHaveProperty("hasError", true);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy.mock.calls[0]).toEqual([
    error,
    {
      componentStack: `
    in Something (created by Fragment)
    in Fragment (created by ErrorBoundary)
    in ErrorBoundary (created by WrapperComponent)
    in WrapperComponent`
    }
  ]);
});

test("slice([begin[, end]])", () => {
  let wrapper = shallow(
    <div>
      <div className="foo bax" />
      <div className="foo bar" />
      <div className="foo baz" />
    </div>
  );

  expect(wrapper.find(".foo").slice(1)).toHaveLength(2);

  expect(
    wrapper
      .find(".foo")
      .slice(1)
      .at(0)
      .hasClass("bar")
  ).toBe(true);

  expect(
    wrapper
      .find(".foo")
      .slice(1)
      .at(1)
      .hasClass("baz")
  ).toBe(true);

  wrapper = shallow(
    <div>
      <div className="foo bax" />
      <div className="foo bar" />
      <div className="foo baz" />
    </div>
  );

  expect(wrapper.find(".foo").slice(1, 2)).toHaveLength(1);

  expect(
    wrapper
      .find(".foo")
      .slice(1, 2)
      .at(0)
      .hasClass("bar")
  ).toBe(true);
});

test("some(selector)", () => {
  const wrapper = shallow(
    <div>
      <div className="foo qoo" />
      <div className="foo boo" />
      <div className="foo hoo" />
    </div>
  );

  expect(wrapper.find(".foo").some(".qoo")).toBe(true);
  expect(wrapper.find(".foo").some(".foo")).toBe(true);
  expect(wrapper.find(".foo").some(".bar")).toBe(false);
});

test("someWhere(predicate)", () => {
  const wrapper = shallow(
    <div>
      <div className="foo qoo" />
      <div className="foo boo" />
      <div className="foo hoo" />
    </div>
  );
  expect(wrapper.find(".foo").someWhere(n => n.hasClass("qoo"))).toBe(true);
  expect(wrapper.find(".foo").someWhere(n => n.hasClass("foo"))).toBe(true);
  expect(wrapper.find(".foo").someWhere(n => n.hasClass("bar"))).toBe(false);
});

test("state([key])", () => {
  class StatefulComponent extends React.Component {
    state = {
      foo: 10
    };

    render() {
      return <div>{this.state.foo}</div>;
    }
  }

  const wrapper = shallow(<StatefulComponent />);
  expect(wrapper.state().foo).toBe(10);
  expect(wrapper.state("foo")).toBe(10);
});

test("tap(intercepter)", () => {
  shallow(
    <ul>
      <li>xxx</li>
      <li>yyy</li>
      <li>zzz</li>
    </ul>
  )
    .find("li")
    .tap(n => console.log(n.debug()))
    .map(n => n.text());
});

test("text()", () => {
  let wrapper = shallow(
    <div>
      <b>important</b>
    </div>
  );
  expect(wrapper.text()).toEqual("important");

  wrapper = shallow(
    <div>
      <Foo />
      <b>important</b>
    </div>
  );
  expect(wrapper.text()).toEqual("<Foo />important");
});

describe("type()", () => {
  test("div", () => {
    function Foo() {
      return <div />;
    }

    const wrapper = shallow(<Foo />);
    expect(wrapper.type()).toBe("div");
  });

  test("button", () => {
    function Foo() {
      return (
        <div>
          <button type="button" className="btn">
            Button
          </button>
        </div>
      );
    }

    const wrapper = shallow(<Foo />);
    expect(wrapper.find(".btn").type()).toEqual("button");
  });

  test("Bar", () => {
    function Bar() {
      return <Foo />;
    }

    const wrapper = shallow(<Bar />);
    expect(wrapper.type()).toBe(Foo);
  });

  test("Null", () => {
    function Null() {
      return null;
    }

    const wrapper = shallow(<Null />);
    expect(wrapper.type()).toBeNull();
  });
});

test.skip("update()", () => {
  class ImpureRender extends React.Component {
    constructor(props) {
      super(props);
      this.count = 0;
    }

    render() {
      this.count += 1;
      return <div>{this.count}</div>;
    }
  }

  const wrapper = mount(<ImpureRender />);
  expect(wrapper.text()).toBe("0");
  wrapper.update();
  expect(wrapper.text()).toBe("1");
});
