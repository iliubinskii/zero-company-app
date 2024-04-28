import React from "react";
import { lang } from "../langs";
import { useUser } from "@auth0/nextjs-auth0/client";

const ProfileButton: React.FC = () => {
  const { error, isLoading, user } = useUser();

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Style this
  if (isLoading) return <div>{lang.Loading}</div>;

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Style this
  if (error) return <div>{error.message}</div>;

  return user ? (
    <div>{lang.Profile}</div>
  ) : (
    <a
      className="px-2 py-3 transition-colors duration-150 hover:text-green-800"
      href="/api/auth/login"
    >
      {lang.LogIn}
    </a>
  );
};

export default ProfileButton;
