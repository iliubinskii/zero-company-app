import type { AuthUser, AuthUserEssential } from "../../schema";
import type { AppState } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState["auth"] = {};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setAuthUser: (
      state,
      action: PayloadAction<AuthUser | AuthUserEssential | undefined>
    ) => {
      if (action.payload) state.authUser = action.payload;
      else delete state.authUser;
    }
  }
});

export const authReducer = authSlice.reducer;

export const { setAuthUser } = authSlice.actions;

/**
 * Select the authenticated user.
 * @param state - The app state.
 * @returns The authenticated user.
 */
export const selectAuthUser = (
  state: AppState
): AuthUser | AuthUserEssential | undefined => state.auth.authUser;

export type AuthActions = ReturnType<typeof setAuthUser>;
