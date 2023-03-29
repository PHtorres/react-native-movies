module.exports = {
    preset: 'react-native',
    setupFiles: ['<rootDir>/jest/setup.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest/setupFilesAfterEnv.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: ['src/screens/**/*.tsx', '!src/screens/**/*.test.tsx'],
    coverageReporters: ['lcov'],
  };
  