import { isUndefined, omitBy } from "lodash";
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

/**
 * Removes all undefined values from the object.
 * @param value - The object to remove undefined values from.
 * @returns The object with all undefined values removed.
 */
export function removeUndefined<T extends object>(
  value: T
): RemoveUndefined<T> {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return omitBy(value, isUndefined) as RemoveUndefined<T>;
}

export type RemoveUndefined<T> = { [K in keyof T]: Exclude<T[K], undefined> };
