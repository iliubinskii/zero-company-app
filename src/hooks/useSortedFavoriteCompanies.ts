import { selectFavoriteCompanies, useAppSelector } from "../store";
import type { ExistingCompany } from "../schema";
import { useMemo } from "react";

/**
 * Uses the favorite companies from the state and sorts them by creation date.
 * @returns The sorted favorite companies.
 */
export function useSortedFavoriteCompanies(): readonly ExistingCompany[] {
  const favoriteCompanies = useAppSelector(selectFavoriteCompanies);

  return useMemo(
    () =>
      [...favoriteCompanies].sort((d1, d2) => {
        if (d1.createdAt > d2.createdAt) return -1;

        if (d1.createdAt < d2.createdAt) return 1;

        return 0;
      }),
    [favoriteCompanies]
  );
}
