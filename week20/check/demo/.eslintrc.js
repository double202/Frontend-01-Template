module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: 'error',
    'no-unused-vars': 'error',
  },
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,// default to "createReactClass"
      pragma: 'create', // Pragma to use, default to "React"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      flowVersion: '0.53', // Flow version
    },
  },
};
