import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { JwtUser } from "../../../schema";
import type { RootState } from "../types";

const initialState: RootState["userAuth"] = {};

const userAuthSlice = createSlice({
  initialState,
  name: "userAuth",
  reducers: {
    setJwtUser: (state, action: PayloadAction<JwtUser | undefined>) => {
      if (action.payload) state.jwtUser = action.payload;
      else delete state.jwtUser;
    }
  }
});

export const userAuthReducer = userAuthSlice.reducer;

export const { setJwtUser } = userAuthSlice.actions;

export const selectJwtUser = (state: RootState): JwtUser | undefined =>
  state.userAuth.jwtUser;
