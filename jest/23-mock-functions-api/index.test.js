test("mockName and getMockName", () => {
  const mockFn = jest.fn().mockName("Mock Function");
  expect(mockFn.getMockName()).toBe("Mock Function");
});

test("mock.calls", () => {
  const mockFn = jest.fn();
  mockFn(1, 2);
  mockFn(3, 4);

  expect(mockFn.mock.calls).toEqual([[1, 2], [3, 4]]);
});

test("mock.results", () => {
  const mockFn = jest.fn().mockImplementation(typeToReturn => {
    if (typeToReturn === "ok") {
      return 1;
    }

    if (typeToReturn === "error") {
      throw new Error("error");
    }

    if (typeToReturn === "incomplete") {
      console.log(mockFn.mock.results[mockFn.mock.results.length - 1].type);
      expect(mockFn.mock.results[mockFn.mock.results.length - 1].type).toBe(
        "incomplete"
      );
      return 2;
    }
  });

  try {
    mockFn("ok");
    mockFn("incomplete");
    mockFn("error");
  } catch (error) {
    // ignore
  }

  expect(mockFn.mock.results[0]).toEqual({ type: "return", value: 1 });
  expect(mockFn.mock.results[1]).toEqual({ type: "return", value: 2 });

  expect(mockFn.mock.results[2].type).toEqual("throw");
  expect(mockFn.mock.results[2].value.message).toEqual("error");
});

test("mock.instances", () => {
  const mockFn = jest.fn();

  const a = new mockFn();
  const b = new mockFn();

  mockFn.mock.instances[0] === a;
  mockFn.mock.instances[1] === b;
});

test("mockFn.mockClear", () => {
  const mockFn = jest.fn().mockImplementation(() => 42);
  const MockClass = jest.fn();

  new MockClass();
  expect(mockFn()).toBe(42);

  expect(mockFn.mock.calls).toHaveLength(1);
  expect(MockClass.mock.instances).toHaveLength(1);

  mockFn.mockClear();
  MockClass.mockClear();

  new MockClass();
  expect(mockFn()).toBe(42);

  expect(mockFn.mock.calls).toHaveLength(1);
  expect(MockClass.mock.instances).toHaveLength(1);
});

test("mockFn.mockReset", () => {
  const mockFn = jest.fn().mockImplementation(() => 42);
  const MockClass = jest.fn();

  new MockClass();
  expect(mockFn()).toBe(42);

  expect(mockFn.mock.calls).toHaveLength(1);
  expect(MockClass.mock.instances).toHaveLength(1);

  mockFn.mockReset();
  MockClass.mockReset();

  new MockClass();
  expect(mockFn()).toBeUndefined();

  expect(mockFn.mock.calls).toHaveLength(1);
  expect(MockClass.mock.instances).toHaveLength(1);
});

test("mockFn.mockRestore", () => {
  const StringUtils = {
    toUpperCase(arg) {
      return arg && arg.toUpperCase();
    }
  };

  const spy = jest
    .spyOn(StringUtils, "toUpperCase")
    .mockImplementation(() => "MOCK");
  expect(StringUtils.toUpperCase("arg")).toBe("MOCK");
  expect(spy).toHaveBeenCalledTimes(1);
  expect(jest.isMockFunction(StringUtils.toUpperCase)).toBeTruthy();

  spy.mockRestore();

  expect(jest.isMockFunction(StringUtils.toUpperCase)).toBeFalsy();
  expect(StringUtils.toUpperCase("arg")).toBe("ARG");
  expect(spy("arg")).toBeUndefined();
  expect(spy).toHaveBeenCalledTimes(1);
});

describe("mockImplementation", () => {
  test("function", () => {
    const mockFn1 = jest.fn().mockImplementation(() => 42);
    const mockFn2 = jest.fn(() => 42);

    expect(mockFn1()).toBe(42);
    expect(mockFn2()).toBe(42);
  });

  test("class", () => {
    const SomeClass = jest.fn();
    const mMock = jest.fn();

    SomeClass.mockImplementation(() => {
      return {
        m: mMock
      };
    });

    const some = new SomeClass();
    some.m("a", "b");
    console.log("Calls to m: ", mMock.mock.calls);
    expect(mMock.mock.calls).toEqual([["a", "b"]]);
  });
});

test("mockImplementationOnce", () => {
  const mockFn = jest
    .fn(() => "default")
    .mockImplementationOnce(() => "first call")
    .mockImplementationOnce(() => "second call");

  expect(mockFn()).toBe("first call");
  expect(mockFn()).toBe("second call");
  expect(mockFn()).toBe("default");
});

test("mockName", () => {
  const mockFn = jest.fn().mockName("mockedFunction");
  mockFn(); // comment me
  expect(mockFn).toHaveBeenCalled();
});

test("mockReturnThis", () => {
  const mock = {
    chainedOne: jest.fn().mockReturnThis(),
    chainedTwo: jest.fn(function() {
      return this;
    })
  };

  expect(mock.chainedOne().chainedTwo).toBe(mock.chainedTwo);
  expect(mock.chainedTwo().chainedOne).toBe(mock.chainedOne);
});

test("mockReturnValue", () => {
  const mockFn = jest.fn().mockReturnValue(42);
  expect(mockFn()).toBe(42);
});

test("mockReturnValueOnce", () => {
  const mockFn = jest
    .fn()
    .mockReturnValue("default")
    .mockReturnValueOnce("first call")
    .mockReturnValueOnce("second call");

  expect(mockFn()).toBe("first call");
  expect(mockFn()).toBe("second call");
  expect(mockFn()).toBe("default");
});

test("mockResolvedValue", async () => {
  const mockFn = jest.fn().mockResolvedValue(42);
  return expect(mockFn()).resolves.toBe(42);
});

test("mockReturnValueOnce", async () => {
  const mockFn = jest
    .fn()
    .mockResolvedValue("default")
    .mockResolvedValueOnce("first call")
    .mockResolvedValueOnce("second call");

  await expect(mockFn()).resolves.toBe("first call");
  await expect(mockFn()).resolves.toBe("second call");
  await expect(mockFn()).resolves.toBe("default");
});

test("mockRejectedValue", async () => {
  const mockFn = jest.fn().mockRejectedValue(42);
  return expect(mockFn()).rejects.toBe(42);
});

test("mockRejectedValueOnce", async () => {
  const mockFn = jest
    .fn()
    .mockRejectedValue("default")
    .mockRejectedValueOnce("first call")
    .mockRejectedValueOnce("second call");

  await expect(mockFn()).rejects.toBe("first call");
  await expect(mockFn()).rejects.toBe("second call");
  await expect(mockFn()).rejects.toBe("default");
});
