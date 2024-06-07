"use client";

import type { FC, ReactNode } from "react";
import {
  GRAVATAR_DEFAULT,
  GRAVATAR_MP,
  GRAVATAR_RATING,
  GRAVATAR_SIZE,
  PLACEHOLDER_EMAIL
} from "../../consts";
import { LuHeartHandshake, LuLayoutDashboard, LuUser2 } from "react-icons/lu";
import { selectAuthUser, useAppSelector } from "../../store";
import { API_URL } from "../../config";
import { AnimatedLink } from "..";
import { BsBookmarks } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { IoDocumentsOutline } from "react-icons/io5";
import React from "react";
import { RxRocket } from "react-icons/rx";
import gravatar from "gravatar";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";
import { usePathname } from "next/navigation";

/**
 * Profile layout.
 * @param props - The properties.
 * @param props.children - The children.
 * @returns The element.
 */
export const ProfileLayout: FC<Props> = ({ children }) => {
  const authUser = useAppSelector(selectAuthUser);

  const pathname = usePathname();

  return (
    <Container className="mx-auto max-w-screen-2xl">
      <SideMenu>
        <User>
          <UserImage
            alt={lang.Profile}
            src={
              authUser
                ? gravatar.url(authUser.email, {
                    d: GRAVATAR_DEFAULT,
                    r: GRAVATAR_RATING,
                    s: GRAVATAR_SIZE
                  })
                : gravatar.url("", {
                    d: GRAVATAR_MP,
                    r: GRAVATAR_RATING,
                    s: GRAVATAR_SIZE
                  })
            }
          />
          <UserInfo>
            <UserName>
              {authUser && authUser.user
                ? `${authUser.user.firstName} ${authUser.user.lastName}`
                : lang.NoName}
            </UserName>
            <UserEmail>
              {authUser ? authUser.email : PLACEHOLDER_EMAIL}
            </UserEmail>
          </UserInfo>
        </User>
        <Links>
          {links.map(({ Icon, href, text }) => (
            <Link
              className={href === pathname ? "bg-slate-200" : undefined}
              href={href}
              key={href}
            >
              <Icon className="text-2xl" />
              {text}
            </Link>
          ))}
        </Links>
      </SideMenu>
      <Contents>{children}</Contents>
    </Container>
  );
};

export interface Props {
  readonly children: ReactNode;
}

const Container = tw.div`p-3 flex gap-5`;

const SideMenu = tw.div`p-3 flex flex-col gap-5`;

const User = tw.div`h-16 w-64 flex items-center gap-3`;

const UserImage = tw.img`h-16 w-16 rounded-full border border-slate-200`;

const UserInfo = tw.div`flex flex-col gap-1 overflow-hidden`;

const UserName = tw.div`text-gray-700 font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap`;

const UserEmail = tw.div`text-sm text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap`;

const Links = tw.div`w-64 flex flex-col gap-1`;

const Link = tw(AnimatedLink)`
  rounded
  px-5 py-3
  flex items-center gap-4
  text-slate-700
`;

const Contents = tw.div`flex-grow p-9 flex flex-col gap-9`;

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
