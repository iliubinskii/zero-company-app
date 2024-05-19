import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./slices";

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer
  }
});
