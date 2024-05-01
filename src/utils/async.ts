/**
 * Call an async function without waiting for it to finish.
 * @param fn - The async function to call.
 */
export function callAsync<T>(fn: () => Promise<T>): void {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises -- Postponed
  fn();
}
