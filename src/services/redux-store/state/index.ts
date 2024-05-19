import { JwtUser } from "../../../schema";

export interface RootState {
  readonly userAuth: {
    readonly jwtUser?: JwtUser;
  };
}
