import { authReducer, companyRegistrationReducer } from "./slices";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { REDUX_PERSIST_KEY } from "../../consts";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

/**
 * Creates a persisted store.
 * @returns The store and the persistor.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export function createdPersistedStore() {
  const rootReducer = combineReducers({
    auth: authReducer,
    companyRegistration: companyRegistrationReducer
  });

  const persistedReducer = persistReducer(
    {
      key: REDUX_PERSIST_KEY,
      storage,
      whitelist: ["auth", "companyRegistration"]
    },
    rootReducer
  );

  const store = configureStore({
    middleware: getDefaultMiddleware => {
      const defaultMiddleware = getDefaultMiddleware({
        serializableCheck: false
      });

      // eslint-disable-next-line unicorn/prefer-spread -- Ok
      return defaultMiddleware.concat(thunk);
    },
    reducer: persistedReducer
  });

  const persistor = persistStore(store);

  return { persistor, store };
}
