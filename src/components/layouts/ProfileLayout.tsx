"use client";

import type { FC, ReactNode } from "react";
import { LuHeartHandshake, LuLayoutDashboard, LuUser2 } from "react-icons/lu";
import { API_URL } from "../../config";
import { AnimatedLink } from "../AnimatedLink";
import { BsBookmarks } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { IoDocumentsOutline } from "react-icons/io5";
import React from "react";
import { RxRocket } from "react-icons/rx";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";
import { usePathname } from "next/navigation";

export const ProfileLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <Container>
      <Menu>
        {links.map(({ Icon, href, text }) => (
          <MenuItem
            className={href === pathname ? "bg-slate-100" : undefined}
            href={href}
            key={href}
          >
            <Icon className="text-2xl" />
            {text}
          </MenuItem>
        ))}
      </Menu>
      <Contents>{children}</Contents>
    </Container>
  );
};

export interface Props {
  readonly children: ReactNode;
}

const Container = tw.div`flex`;

const Contents = tw.div`flex-grow p-9 flex flex-col gap-9`;

const Menu = tw.div`w-64 p-3 flex flex-col gap-1`;

const MenuItem = tw(AnimatedLink)`
  rounded
  px-5 py-3
  flex items-center gap-4
  text-slate-700
`;

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
    Icon: LuHeartHandshake,
    href: "/profile/drafts",
    text: lang.MyDrafts
  },
  {
    Icon: IoDocumentsOutline,
    href: "/profile/documents",
    text: lang.Documents
  },
  {
    Icon: LuUser2,
    href: "/profile/settings",
    text: lang.Settings
  },
  {
    Icon: BsBookmarks,
    href: "/profile/bookmarks",
    text: lang.Bookmarks
  },
  {
    Icon: GoSignOut,
    href: `${API_URL}auth/logout`,
    text: lang.LogOut
  }
];
