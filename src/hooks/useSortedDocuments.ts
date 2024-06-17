import { selectDocuments, useAppSelector } from "../store";
import type { PopulatedDocument } from "../schema";
import { useMemo } from "react";

/**
 * Uses the documents from the state and sorts them by creation date.
 * @returns The sorted documents.
 */
export function useSortedDocuments(): readonly PopulatedDocument[] {
  const documents = useAppSelector(selectDocuments);

  return useMemo(
    () =>
      [...documents].sort((d1, d2) => {
        if (d1.createdAt > d2.createdAt) return -1;

        if (d1.createdAt < d2.createdAt) return 1;

        return 0;
      }),
    [documents]
  );
}
