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
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended/all", "./jest.setup-after-env.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/dist/", "/node_modules/", "/tests/"]
};

export default createJestConfig(config);
