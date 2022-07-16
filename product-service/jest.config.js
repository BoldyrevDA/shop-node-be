/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest"
  }
};

module.exports = config;
