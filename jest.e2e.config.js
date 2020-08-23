module.exports = {
  preset: 'jest-playwright-preset',
  globals: {
    baseURL: "http://localhost:3000"
  },
  testMatch: ["**/e2e/specs/*.js"],
  transform: {
    "\\.js$": "react-scripts/config/jest/babelTransform"
  },
  verbose: true
};
