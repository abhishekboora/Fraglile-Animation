module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // For the new JSX transform
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  rules: {
    // You can add your own rules here.
    'react/prop-types': 'off', // Example: disable prop-types rule if not using them
  },
};
