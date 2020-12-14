module.exports = {
  env: {
    jest: true
  },
  extends: "airbnb-base",
  rules: {
    "comma-dangle": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "no-return-assign": 0,
    camelcase: 0,
    "no-bitwise": ["error", { allow: ["|"] }],
    "max-len": 0,
    quotes: [2, "double", "avoid-escape"],
    "arrow-body-style": 0
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: [
          "node_modules",
          "src" // replace with your app-module-path directory
        ]
      }
    }
  }
};
