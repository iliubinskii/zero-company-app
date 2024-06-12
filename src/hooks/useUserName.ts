import { selectUser, useAppSelector } from "../store";
import { lang } from "../langs";

/**
 * Use user name.
 * @returns The user name.
 */
export function useUserName(): string {
  const user = useAppSelector(selectUser);

  if (user) {
    if (typeof user.firstName === "string" && typeof user.lastName === "string")
      return `${user.firstName} ${user.lastName}`;

    if (typeof user.firstName === "string") return user.firstName;

    if (typeof user.lastName === "string") return user.lastName;
  }

  return lang.ZeroMember;
}
