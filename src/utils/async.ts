/**
 * Call an async function without waiting for it to finish.
 * @param fn - The async function to call.
 */
export function callAsync<T>(fn: () => Promise<T>): void {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises -- Postponed
  fn();
}

/**
 * Delay the execution of the next line of code.
 * @param ms - The number of milliseconds to delay.
 * @returns A promise that resolves after the delay.
 */
export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
