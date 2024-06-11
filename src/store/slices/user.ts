import type { AppState } from "../types";
import type { ExistingUser } from "../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { dangerouslyAssumeWritable } from "../../utils";

const initialState: AppState["user"] = {};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    clearUser: state => {
      state.user = undefined;
    },
    setUser: (state, action: PayloadAction<ExistingUser>) => {
      state.user = dangerouslyAssumeWritable(action.payload);
    }
  }
});

export const userReducer = userSlice.reducer;

export const { clearUser, setUser } = userSlice.actions;

/**
 * Select the user.
 * @param state - The app state.
 * @returns The user.
 */
export const selectUser = (state: AppState): ExistingUser | undefined =>
  state.user.user;

export type UserActions =
  | ReturnType<typeof clearUser>
  | ReturnType<typeof setUser>;
