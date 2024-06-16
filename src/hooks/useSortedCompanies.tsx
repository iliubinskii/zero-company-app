import { CompanyStatus, type ExistingCompany } from "../schema";
import { selectCompanies, useAppSelector } from "../store";
import { useMemo } from "react";

/**
 * Uses the companies from the state and sorts them by creation date.
 * @returns The sorted companies.
 */
export function useSortedCompanies(): readonly ExistingCompany[] {
  const companies = useAppSelector(selectCompanies);

  return useMemo(
    () =>
      companies
        .filter(company => company.status === CompanyStatus.founded)
        .sort((d1, d2) => {
          if (d1.createdAt > d2.createdAt) return -1;

          if (d1.createdAt < d2.createdAt) return 1;

          return 0;
        }),
    [companies]
  );
}
