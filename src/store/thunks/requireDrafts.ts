import { setDrafts, showSnackbar } from "../slices";
import type { AppThunk } from "../types";
import { CompanyStatus } from "../../schema";
import { api } from "../../api";
import { logger } from "../../services";

export const requireDrafts: AppThunk = () => async dispatch => {
  const drafts = await api.getCompaniesByMe({
    sortBy: "createdAt",
    sortOrder: "desc",
    status: CompanyStatus.draft
  });

  if ("error" in drafts) {
    logger.error(`${drafts.error}: ${drafts.errorMessage}`);
    dispatch(
      showSnackbar({
        message: drafts.errorMessage,
        variant: "error"
      })
    );
  } else dispatch(setDrafts(drafts.docs));
};
