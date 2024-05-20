import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { REDUX_PERSIST_KEY } from "../../consts";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
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
  middleware: getDefaultMiddleware => {
    const defaultMiddleware = getDefaultMiddleware();

    // eslint-disable-next-line unicorn/prefer-spread -- Ok
    return defaultMiddleware.concat(thunk);
  },
  reducer: persistedReducer
});

export const persistor = persistStore(store);
