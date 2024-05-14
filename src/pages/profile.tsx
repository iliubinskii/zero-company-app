import { Fallback, Unauthorized } from "../components";
import { LuLayoutDashboard, LuUser2 } from "react-icons/lu";
import { BsBookmarks } from "react-icons/bs";
import { CLIENT_API_URL } from "../config";
import { GoSignOut } from "react-icons/go";
import { IoDocumentsOutline } from "react-icons/io5";
import Link from "next/link";
import { NextPage } from "next";
import React from "react";
import { RxRocket } from "react-icons/rx";
import { lang } from "../langs";
import { useJwtUser } from "../contexts";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const { isLoading, jwtUser } = useJwtUser();

  const router = useRouter();

  if (isLoading || router.isFallback) return <Fallback />;

  if (jwtUser) {
    const links = [
      {
        Icon: LuLayoutDashboard,
        href: "/profile",
        text: lang.Dashboard
      },
      {
        Icon: RxRocket,
        href: "/profile/companies",
        text: lang.MyCompanies
      },
      {
        Icon: IoDocumentsOutline,
        href: "/profile/documents",
        text: lang.Documents
      },
      {
        Icon: LuUser2,
        href: "/profile/account",
        text: lang.Account
      },
      {
        Icon: BsBookmarks,
        href: "/profile/bookmarks",
        text: lang.Bookmarks
      },
      {
        Icon: GoSignOut,
        href: `${CLIENT_API_URL}auth/logout`,
        text: lang.LogOut
      }
    ];

    return (
      <div className="w-64 p-3 flex flex-col gap-1">
        {links.map(({ Icon, href, text }) => {
          const className = href === "/profile" ? "bg-slate-300" : "";

          return (
            <Link
              className={`px-5 py-3 rounded flex items-center gap-4 text-slate-700 ${className}`.trim()}
              href={href}
              key={href}
            >
              <Icon className="text-2xl" />
              {text}
            </Link>
          );
        })}
      </div>
    );
  }

  return <Unauthorized />;
};

export default Page;
