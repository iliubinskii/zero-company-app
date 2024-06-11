import type { ExistingCompany, ExistingUser } from "../../schema";
import { logError, setUser } from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";

/**
 * Toggles a company's favorite status.
 * @param company - The company.
 * @param user - The user.
 * @returns A thunk that toggles the company's favorite status.
 */
export function toggleFavorite(
  company: ExistingCompany,
  user: ExistingUser
): AppThunk {
  return async dispatch => {
    const updatedUser = await api.putMe(
      user._id,
      user.favoriteCompanies.includes(company._id)
        ? { removeFavoriteCompanies: [company._id] }
        : { addFavoriteCompanies: [company._id] }
    );

    if ("error" in updatedUser)
      dispatch(
        logError({
          error: updatedUser,
          message: updatedUser.errorMessage
        })
      );
    else dispatch(setUser(updatedUser));
  };
}
