import type {
  ExistingCategories,
  ExistingCategory,
  ExistingCompanies,
  ExistingCompany,
  ExistingDocument,
  JsonTransform,
  MultipleDocsResponse,
  PopulatedDocument
} from "../../schema";

/**
 * Restores the company dates.
 * @param company - The company.
 * @returns The restored company.
 */
export function restoreCompany(
  company: JsonTransform<ExistingCompany>
): ExistingCompany {
  const { createdAt, foundedAt, ...rest } = company;

  return {
    createdAt: new Date(createdAt),
    foundedAt: typeof foundedAt === "string" ? new Date(foundedAt) : undefined,
    ...rest
  };
}

/**
 * Restores the company dates.
 * @param response - The response.
 * @returns The restored response.
 */
export function restoreCompanies(
  response: RawMultipleDocsResponse<JsonTransform<ExistingCompany>>
): ExistingCompanies {
  const { docs, nextCursor, ...rest } = response;

  return {
    docs: docs.map(restoreCompany),
    nextCursor: restoreCursor(nextCursor),
    ...rest
  };
}

/**
 * Restores the company dates.
 * @param category - The company.
 * @returns The restored company.
 */
export function restoreCategory(
  category: JsonTransform<ExistingCategory>
): ExistingCategory {
  return category;
}

/**
 * Restores the company dates.
 * @param response - The response.
 * @returns The restored response.
 */
export function restoreCategories(
  response: RawMultipleDocsResponse<JsonTransform<ExistingCategory>>
): ExistingCategories {
  const { docs, nextCursor, ...rest } = response;

  return {
    docs: docs.map(restoreCategory),
    nextCursor: restoreCursor(nextCursor),
    ...rest
  };
}

/**
 * Restores the cursor.
 * @param cursor - The cursor.
 * @returns The restored cursor.
 */
function restoreCursor(
  cursor: readonly string[] | null | undefined
): readonly [string, string] | null | undefined {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return cursor as readonly [string, string] | null | undefined;
}

/**
 * Restores the document dates.
 * @param document - The document.
 * @returns The restored document.
 */
export function restoreDocument(
  document: JsonTransform<ExistingDocument>
): ExistingDocument {
  const { createdAt, ...rest } = document;

  return {
    createdAt: new Date(createdAt),
    ...rest
  };
}

/**
 * Restores the document dates.
 * @param response - The response.
 * @returns The restored response.
 */
export function restoreDocuments(
  response: RawMultipleDocsResponse<JsonTransform<ExistingDocument>>
): MultipleDocsResponse<ExistingDocument> {
  const { docs, nextCursor, ...rest } = response;

  return {
    docs: docs.map(restoreDocument),
    nextCursor: restoreCursor(nextCursor),
    ...rest
  };
}

/**
 * Restores the document dates.
 * @param document - The document.
 * @returns The restored document.
 */
export function restorePopulatedDocument(
  document: JsonTransform<PopulatedDocument>
): PopulatedDocument {
  const { company, createdAt, ...rest } = document;

  return {
    company: restoreCompany(company),
    createdAt: new Date(createdAt),
    ...rest
  };
}

/**
 * Restores the document dates.
 * @param response - The response.
 * @returns The restored response.
 */
export function restorePopulatedDocuments(
  response: RawMultipleDocsResponse<JsonTransform<PopulatedDocument>>
): MultipleDocsResponse<PopulatedDocument> {
  const { docs, nextCursor, ...rest } = response;

  return {
    docs: docs.map(restorePopulatedDocument),
    nextCursor: restoreCursor(nextCursor),
    ...rest
  };
}

export interface RawMultipleDocsResponse<T>
  extends Omit<MultipleDocsResponse<T>, "nextCursor"> {
  readonly nextCursor?: readonly string[] | null | undefined;
}
