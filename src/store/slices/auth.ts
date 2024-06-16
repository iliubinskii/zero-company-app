import type { AppState } from "../types";
import type { AuthUser } from "../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState["auth"] = { authUser: null };

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.authUser = action.payload;
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
export const selectAuthUser = (state: AppState): AuthUser | null =>
  state.auth.authUser;

export type AuthActions = ReturnType<typeof setAuthUser>;
