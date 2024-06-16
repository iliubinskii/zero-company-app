import { addDocument, clearDocuments, logError } from "../slices";
import type { AppThunk } from "../types";
import type { PopulatedDocument } from "../../schema";
import { api } from "../../api";
import { lang } from "../../langs";

/**
 * Refreshes a document.
 * @param id - The document id.
 * @returns The document.
 */
export function refreshDocument(
  id: string
): AppThunk<PopulatedDocument | undefined> {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState().auth;

      if (authUser) {
        const document = await api.putDocument(id);

        if ("error" in document)
          dispatch(
            logError({ error: document, message: document.errorMessage })
          );
        else {
          dispatch(addDocument(document));

          return document;
        }
      } else dispatch(clearDocuments());
    } catch (err) {
      dispatch(logError({ error: err, message: lang.ErrorLoadingDrafts }));
    }

    return undefined;
  };
}
