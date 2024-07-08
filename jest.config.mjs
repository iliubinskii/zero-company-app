import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./src" });

/**
 * @type {import("jest").Config}
 */
const config = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageReporters: ["lcov"],
  coverageThreshold: {
    // eslint-disable-next-line no-warning-comments -- Postponed
    // TODO: Better coverage
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended/all", "./jest.setup-after-env.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/dist/", "/node_modules/", "/tests/"]
};

export default createJestConfig(config);
