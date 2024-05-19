import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { REDUX_PERSIST_KEY } from "../../consts";
import storage from "redux-persist/lib/storage";
import { useDispatch } from "react-redux";
import { userAuthReducer } from "./slices";

const rootReducer = combineReducers({
  userAuth: userAuthReducer
});

const persistedReducer = persistReducer(
  {
    key: REDUX_PERSIST_KEY,
    storage,
    whitelist: ["userAuth"]
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);

/**
 * A hook to access the Redux dispatch function.
 * @returns The Redux dispatch function.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export function useAppDispatch() {
  return useDispatch<typeof store.dispatch>();
}
