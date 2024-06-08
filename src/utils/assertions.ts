/**
 * Asserts that a value is defined.
 * @param value - The value to check.
 * @param errorMessage - The error message to throw if the value is undefined.
 * @returns The value if it is defined.
 * @throws An error if the value is undefined.
 */
export function assertDefined<T>(
  value: T | undefined,
  errorMessage: string
): T {
  if (value === undefined) throw new Error(errorMessage);

  return value;
}

/**
 * Asserts that a value is an HTMLFormElement.
 * @param value - The value to check.
 * @param errorMessage - The error message to throw if the value is not an HTMLFormElement.
 * @returns The value if it is an HTMLFormElement.
 */
export function assertHTMLFormElement(
  value: EventTarget,
  errorMessage: string
): HTMLFormElement {
  if (value instanceof HTMLFormElement) return value;

  throw new Error(errorMessage);
}

/**
 * Asserts that a value is not null.
 * @param value - The value to check.
 * @param errorMessage - The error message to throw if the value is null.
 * @returns The value if it is not null.
 * @throws An error if the value is null.
 */
export function assertNotNull<T>(value: T | null, errorMessage: string): T {
  if (value === null) throw new Error(errorMessage);

  return value;
}

/**
 * Asserts that a value is a string.
 * @param value - The value to check.
 * @param errorMessage - The error message to throw if the value is not a string.
 * @returns The value if it is a string.
 * @throws An error if the value is not a string.
 */
export function assertString(value: unknown, errorMessage: string): string {
  if (typeof value === "string") return value;

  throw new Error(errorMessage);
}
