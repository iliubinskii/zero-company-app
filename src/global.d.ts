/* eslint import/no-extraneous-dependencies: ["warn", { "devDependencies": true }] -- Ok */

// eslint-disable-next-line misc/comment-spacing -- Ok
/// <reference types="jest-extended" />

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import type { expect } from "@jest/globals";

declare module "@jest/expect" {
  export interface Matchers<R>
    // eslint-disable-next-line no-undef -- Ok
    extends CustomMatchers<R>,
      TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}

declare module "next/jest.js" {
  export default function nextJest(
    options: unknown
  ): (config: unknown) => unknown;
}
