/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/*.{js,ts}'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  forceExit: true,
  verbose: true,
};

/*
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
/*
module.exports = {
  preset: "ts-jest",
  testMatch: ["**//*/*.test.ts"],
  testEnvironment: "node",
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
*/