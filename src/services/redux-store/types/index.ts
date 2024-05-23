import type { AuthUser, AuthUserEssential } from "../../../schema";
import type { TypedUseSelectorHook, useDispatch } from "react-redux";
import type { store } from "../store";

export type AppDispatch = typeof store.dispatch;

export interface AppThunk<T = void> {
  (): (dispatch: AppDispatch) => Promise<T>;
}

export interface RootState {
  readonly auth: {
    readonly authUser?: AuthUser | AuthUserEssential;
  };
}

export type UseAppDispatch = typeof useDispatch<AppDispatch>;

export type UseAppSelector = TypedUseSelectorHook<RootState>;
