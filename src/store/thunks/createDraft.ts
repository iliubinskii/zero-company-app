import { CREATE_COMPANY_STEP, ERROR } from "../../consts";
import {
  logError,
  resetCompanyRegistration,
  setCompanyCreateStep
} from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";
import { lang } from "../../langs";

/**
 * Deletes a draft.
 * @param push - The function to push a URL to the router.
 * @returns A thunk that deletes the draft and updates the state.
 */
export function createDraft(push: (url: string) => void): AppThunk {
  return async (dispatch, getState) => {
    const {
      auth: { authUser },
      companyRegistration: { category, country, step },
      loaded
    } = getState();

    if (step === CREATE_COMPANY_STEP.REVIEW && loaded && authUser) {
      dispatch(setCompanyCreateStep());

      try {
        if (category && typeof country === "string") {
          const company = await api.postCompany({
            categories: [category._id],
            country
          });

          if ("error" in company) {
            push("/create-company");
            dispatch(
              logError({
                error: company,
                message: company.errorMessage
              })
            );
          } else push(`/profile/drafts/${company._id}`);
        } else {
          push("/create-company");
          dispatch(
            logError({
              error: ERROR.REDUX_STORE_DESYNCHRONIZATION,
              message: lang.ReduxStoreDesynchronization
            })
          );
        }
      } finally {
        dispatch(resetCompanyRegistration());
      }
    }
  };
}
