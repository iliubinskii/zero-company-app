import { LuLayoutDashboard, LuUser2 } from "react-icons/lu";
import { BsBookmarks } from "react-icons/bs";
import { CLIENT_API_URL } from "../../config";
import { GoSignOut } from "react-icons/go";
import { IoDocumentsOutline } from "react-icons/io5";
import { JwtUser } from "../../schema";
import Link from "next/link";
import React from "react";
import { RxRocket } from "react-icons/rx";
import { lang } from "../../langs";
import { useRouter } from "next/router";

export const ProfileLayout: React.FC<Props> = ({
  children,
  className,
  jwtUser,
  ...props
}) => {
  const router = useRouter();

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Use JwtUser to show gravatar
  (() => jwtUser.email)();

  return (
    <div className={`flex ${className}`.trim()} {...props}>
      <div className="w-64 p-3 flex flex-col gap-1">
        {links.map(({ Icon, href, text }) => {
          const classNameBg = href === router.pathname ? "bg-slate-300" : "";

          return (
            <Link
              className={`px-5 py-3 rounded flex items-center gap-4 text-slate-700 ${classNameBg}`.trim()}
              href={href}
              key={href}
            >
              <Icon className="text-2xl" />
              {text}
            </Link>
          );
        })}
      </div>
      <div className="p-9">{children}</div>
    </div>
  );
};

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly jwtUser: JwtUser;
}

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
