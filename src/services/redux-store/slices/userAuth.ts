import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JwtUser } from "../../../schema";
import { RootState } from "../state";

const initialState: RootState["userAuth"] = {};

const userAuthSlice = createSlice({
  initialState,
  name: "userAuth",
  reducers: {
    logOut: state => {
      delete state.jwtUser;
    },
    login: (state, action: PayloadAction<JwtUser>) => {
      state.jwtUser = action.payload;
    }
  }
});

export const userAuthReducer = userAuthSlice.reducer;

export const { logOut, login } = userAuthSlice.actions;

export const selectJwtUser = (state: RootState): JwtUser | undefined =>
  state.userAuth.jwtUser;
