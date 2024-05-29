import type { ErrorCode, ErrorResponse } from "../../schema";
import { API_URL } from "../../config";
import type { Query } from "../../utils";
import type { Readonly } from "ts-toolbelt/out/Object/Readonly";
import { buildQuery } from "../../utils";

/**
 * Retrieves data from the API.
 * @param endpoint - The endpoint.
 * @param query - The query.
 * @returns The data.
 */
export async function get<
  R extends {
    responses: {
      [K: PropertyKey]: { content: { "application/json": object } };
    };
  } = never
>(
  endpoint: string,
  query: Query = {}
): Promise<Response<R> | ErrorResponse<ErrorCode>> {
  const queryStr = buildQuery(query);

  const response = await fetch(`${API_URL}${endpoint}${queryStr}`, {
    credentials: "include"
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const json = (await response.json()) as Response<R>;

  return json;
}

/**
 * Sends data to the API.
 * @param endpoint - The endpoint.
 * @param body - The body.
 * @returns The response.
 */
export async function post<
  R extends {
    responses: {
      [K: PropertyKey]: { content: { "application/json": object } };
    };
  } = never
>(
  endpoint: string,
  body: FormData
): Promise<Response<R> | ErrorResponse<ErrorCode>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    body,
    credentials: "include",
    method: "POST"
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const json = (await response.json()) as Response<R>;

  return json;
}

export type Response<
  R extends {
    responses: {
      [K: PropertyKey]: { content: { "application/json": object } };
    };
  } = never
> = Readonly<
  R["responses"][keyof R["responses"]]["content"]["application/json"],
  PropertyKey,
  "deep"
>;
