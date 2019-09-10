let cities = [];

function initializeFoodDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities[0].foods = ["Wiener Schnitzel"];
      cities[1].foods = ["Mofongo"];
      resolve();
    }, 100);
  });
}

function initializeCityDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities.push({ name: "Vienna" });
      cities.push({ name: "San Juan" });
      resolve();
    }, 100);
  });
}

function clearCityDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities = [];
      resolve();
    }, 100);
  });
}

function isCity(name) {
  return cities.map(city => city.name).includes(name);
}

function isValidCityFoodPair(name, food) {
  const city = cities.find(city => city.name === name);

  if (!city || !city.foods) {
    return false;
  }

  return city.foods.includes(food);
}

// Applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase();
});

afterEach(() => {
  return clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

// Doesn't work
// test("Vienna <3 sausage", () => {
//   expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true);
// });

describe("matching cities to foods", () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test("Vienna <3 sausage", () => {
    expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true);
  });

  test("San Juan <3 plantains", () => {
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true);
  });
});
