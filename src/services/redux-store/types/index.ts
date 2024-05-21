import type { useDispatch, useSelector } from "react-redux";
import type { JwtUser } from "../../../schema";
import type { store } from "../store";

export type AppDispatch = typeof store.dispatch;

export interface AppThunk<T = void> {
  (): (dispatch: AppDispatch) => Promise<T>;
}

export interface RootState {
  readonly userAuth: {
    readonly jwtUser?: JwtUser;
  };
}

export type UseAppDispatch = typeof useDispatch<AppDispatch>;

export type UseAppSelector = typeof useSelector<RootState>;
