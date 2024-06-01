import type { AuthActions, CompanyRegistrationActions } from "./slices";
import { SET_STATE, setAppStateReducer } from "./root-actions";
import {
  authReducer,
  companyRegistrationReducer,
  loadedReducer
} from "./slices";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { AppState } from "./types";
import type { SetStateAction } from "./root-actions";
import { thunk } from "redux-thunk";

const slicesReducer = combineReducers({
  auth: authReducer,
  companyRegistration: companyRegistrationReducer,
  loaded: loadedReducer
});

const rootReducer = (
  state: AppState | undefined,
  action: SetStateAction | AuthActions | CompanyRegistrationActions
): AppState => {
  if (action.type === SET_STATE) return setAppStateReducer(state, action);

  return slicesReducer(state, action);
};

export const store = configureStore({
  middleware: getDefaultMiddleware => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false
    });

    // eslint-disable-next-line unicorn/prefer-spread -- Ok
    return defaultMiddleware.concat(thunk);
  },
  reducer: rootReducer
});
