module.exports = async function() {
  if (!global.__DEV__) {
    throw new Error("global.__DEV__ not set");
  }
};
