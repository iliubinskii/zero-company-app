import type { AppAction, AppState } from "./types";
import { SET_STATE, setAppStateReducer } from "./root-actions";
import {
  authReducer,
  companyRegistrationReducer,
  favoriteCompaniesReducer,
  loadedReducer,
  snackbarReducer,
  userCompaniesReducer,
  userDocumentsReducer,
  userReducer
} from "./slices";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { updateOnAuthUserChange } from "./middleware";

const slicesReducer = combineReducers({
  auth: authReducer,
  companyRegistration: companyRegistrationReducer,
  favoriteCompanies: favoriteCompaniesReducer,
  loaded: loadedReducer,
  snackbar: snackbarReducer,
  user: userReducer,
  userCompanies: userCompaniesReducer,
  userDocuments: userDocumentsReducer
});

const rootReducer = (
  state: AppState | undefined,
  action: AppAction
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
    return defaultMiddleware.concat(thunk, updateOnAuthUserChange);
  },
  reducer: rootReducer
});
