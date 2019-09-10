module.exports = {
  watchPlugins: [
    [
      "./custom-watch-plugin",
      {
        key: "k", // <- your custom key
        prompt: "override"
      }
      // {
      //   key: "q", // <- your custom key
      //   prompt: "won't work"
      // }
    ]
  ],
  watchPathIgnorePatterns: ["./ignore-me.test.js"]
};
