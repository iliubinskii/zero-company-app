import type { AuthUser, AuthUserEssential } from "../../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: RootState["auth"] = {};

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

export const selectAuthUser = (
  state: RootState
): AuthUser | AuthUserEssential | undefined => state.auth.authUser;
