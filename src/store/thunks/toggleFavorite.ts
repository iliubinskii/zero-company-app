import type { ExistingCompany, ExistingUser } from "../../schema";
import {
  addFavoriteCompany,
  logError,
  removeFavoriteCompany,
  setUser
} from "../slices";
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
    if (user.favoriteCompanies.includes(company._id)) {
      const updatedUser = await api.putMe({
        removeFavoriteCompanies: [company._id]
      });

      if ("error" in updatedUser)
        dispatch(
          logError({
            error: updatedUser,
            message: updatedUser.errorMessage
          })
        );
      else {
        dispatch(setUser(updatedUser));
        dispatch(removeFavoriteCompany(company));
      }
    } else {
      const updatedUser = await api.putMe({
        addFavoriteCompanies: [company._id]
      });

      if ("error" in updatedUser)
        dispatch(
          logError({
            error: updatedUser,
            message: updatedUser.errorMessage
          })
        );
      else {
        dispatch(setUser(updatedUser));
        dispatch(addFavoriteCompany(company));
      }
    }
  };
}
