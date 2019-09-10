test("fn", () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalled();

  // With a mock implementation:
  const returnsTrue = jest.fn(() => true);
  expect(returnsTrue()).toBeTruthy();
});

test("isMockFunction", () => {
  function common() {
    return true;
  }

  const mockFn = jest.fn();

  expect(jest.isMockFunction(common)).toBeFalsy();
  expect(jest.isMockFunction(mockFn)).toBeTruthy();
});

test("spyOn", () => {
  const video = {
    play() {
      return true;
    }
  };

  const spy = jest.spyOn(video, "play");
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  expect(jest.isMockFunction(video.play)).toBeTruthy();

  spy.mockRestore();

  expect(jest.isMockFunction(video.play)).toBeFalsy();
});

test("spyOn accessType", () => {
  const video = {
    // it's a getter!
    get play() {
      return true;
    }
  };

  const audio = {
    _volume: false,
    // it's a setter!
    set volume(value) {
      this._volume = value;
    },
    get volume() {
      return this._volume;
    }
  };

  let spy = jest.spyOn(video, "play", "get"); // we pass 'get'
  const isPlaying = video.play;

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();

  spy = jest.spyOn(audio, "volume", "set"); // we pass 'set'
  audio.volume = 100;

  expect(spy).toHaveBeenCalled();
  expect(audio.volume).toBe(100);

  spy.mockRestore();
});

test("clearAllMocks", () => {
  const mockFn = jest.fn(() => 42);
  expect(mockFn()).toBe(42);
  expect(mockFn).toHaveBeenCalledTimes(1);

  jest.clearAllMocks();

  expect(mockFn).not.toHaveBeenCalled();
  expect(mockFn()).toBe(42);
});

test("resetAllMocks", () => {
  const mockFn = jest.fn(() => 42);
  expect(mockFn()).toBe(42);
  expect(mockFn).toHaveBeenCalledTimes(1);

  jest.resetAllMocks();

  expect(mockFn).not.toHaveBeenCalled();
  expect(mockFn()).toBeUndefined();
});

test("restoreAllMocks", () => {
  const video = {
    play() {
      return true;
    }
  };

  const audio = {
    increaseVolume() {
      return true;
    }
  };

  jest.spyOn(video, "play");
  jest.spyOn(audio, "increaseVolume");

  expect(jest.isMockFunction(video.play)).toBeTruthy();
  expect(jest.isMockFunction(audio.increaseVolume)).toBeTruthy();

  jest.restoreAllMocks();

  expect(jest.isMockFunction(video.play)).toBeFalsy();
  expect(jest.isMockFunction(audio.increaseVolume)).toBeFalsy();
});
