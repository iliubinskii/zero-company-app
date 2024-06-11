import {
  clearFavoriteCompanies,
  logError,
  setFavoriteCompanies,
  setFavoriteCompaniesError
} from "../slices";
import type { AppThunk } from "../types";
import { CompanyStatus } from "../../schema";
import { api } from "../../api";

/**
 * Refreshes the list of favorite companies.
 * @returns A function that dispatches the appropriate actions.
 */
export function refreshFavoriteCompanies(): AppThunk {
  return async (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (authUser) {
      const favoriteCompanies = await api.getFavoriteCompaniesByMe({
        sortBy: "createdAt",
        sortOrder: "desc",
        status: CompanyStatus.founded
      });

      if ("error" in favoriteCompanies) {
        dispatch(
          logError({
            error: favoriteCompanies,
            message: favoriteCompanies.errorMessage
          })
        );
        dispatch(setFavoriteCompaniesError());
      } else dispatch(setFavoriteCompanies(favoriteCompanies.docs));
    } else dispatch(clearFavoriteCompanies());
  };
}
