"use strict";

// Use require.resolve to prevent issues when using npm link
// see: https://github.com/babel/babel-loader/issues/149

module.exports = {
  rules: {
    "react/jsx-filename-extension": 0,
    "import/no-unresolved": [
      "error",
      {
        ignore: ["src/"]
      }
    ],
    "import/no-extraneous-dependencies": ["off"],
    "import/extensions": ["off", "never"]
  },
  parser: "babel-eslint",
  settings: {
    "import/resolver": {
      "babel-module": {}
    }
  },
  env: { browser: true }
};
