/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const {defaults} = require('jest-config');

const config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  resolver: "<rootDir>/resolver.js",
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'd.ts'],
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: ['/node_modules/(?!@types)'],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest"
  }
};

module.exports = config;
