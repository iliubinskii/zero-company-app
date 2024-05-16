/// <reference types="@testing-library/jest-dom" />
/// <reference types="jest-extended" />

module "next/jest.js" {
  export default function nextJest(
    options: unknown
  ): (config: unknown) => unknown;
}
