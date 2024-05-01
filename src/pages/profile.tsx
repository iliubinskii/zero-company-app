import { CLIENT_API_URL } from "../config";
import { NextPage } from "next";
import React from "react";
import { lang } from "../langs";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Style this
  if (router.isFallback) return <div>{lang.Loading}</div>;

  return (
    <div className="flex flex-col gap-9">
      <a href={`${CLIENT_API_URL}auth/logout`}>{lang.LogOut}</a>
    </div>
  );
};

export default Page;
