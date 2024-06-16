import {
  clearDocuments,
  logError,
  setDocuments,
  setDocumentsError
} from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";
import { lang } from "../../langs";

/**
 * Requires the documents.
 * @returns A thunk that requires the documents and updates the state.
 */
export function refreshDocuments(): AppThunk {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState().auth;

      if (authUser) {
        const documents = await api.getDocumentsByMe();

        if ("error" in documents) {
          dispatch(setDocumentsError());
          dispatch(
            logError({ error: documents, message: documents.errorMessage })
          );
        } else dispatch(setDocuments(documents.docs));
      } else dispatch(clearDocuments());
    } catch (err) {
      dispatch(setDocumentsError());
      dispatch(logError({ error: err, message: lang.ErrorLoadingDocuments }));
    }
  };
}
