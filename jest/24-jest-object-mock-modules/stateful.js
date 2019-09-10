let value = 0;

module.exports = {
  setValue(arg) {
    value = arg;
  },

  getValue() {
    return value;
  }
};
