module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    // shorthand fucks up my editors syntax highlighting
    // could be fixed, but i don't wanna
    "react/jsx-fragments": [2, "element"],
  },
};
