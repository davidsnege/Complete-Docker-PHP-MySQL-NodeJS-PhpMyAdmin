module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  verbose: true,
  setupFiles: ['./jest.setup.js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'app/**/*.js'
  ],
  testTimeout: 30000,
  forceExit: true,
  clearMocks: true
};