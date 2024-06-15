import {
  clearCompanies,
  logError,
  setCompanies,
  setCompaniesError
} from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";
import { lang } from "../../langs";

/**
 * Refreshes the list of companies.
 * @returns A function that dispatches the appropriate actions.
 */
export function refreshCompanies(): AppThunk {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState().auth;

      if (authUser) {
        const companies = await api.getCompaniesByMe();

        if ("error" in companies) {
          dispatch(setCompaniesError());
          dispatch(
            logError({
              error: companies,
              message: companies.errorMessage
            })
          );
        } else dispatch(setCompanies(companies.docs));
      } else dispatch(clearCompanies());
    } catch (err) {
      dispatch(setCompaniesError());
      dispatch(
        logError({
          error: err,
          message: lang.ErrorLoadingCompanies
        })
      );
    }
  };
}
