import { lang } from "../langs";

/**
 * Get the country name by its code.
 * @param country - The country code.
 * @returns The country name.
 */
export function countryName(country: string): string {
  for (const [code, name] of Object.entries(lang.countries))
    if (code === country) return name;

  return lang.Unknown;
}
