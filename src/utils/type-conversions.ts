import type { Writable } from "ts-toolbelt/out/Object/Writable";

/**
 * Dangerously assumes that the value is writable.
 * @param value - The value to assume is writable.
 * @returns The value assumed to be writable.
 */
export function dangerouslyAssumeWritable<T extends object>(
  value: T
): Writable<T, PropertyKey, "deep"> {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return value as unknown as Writable<T, PropertyKey, "deep">;
}
