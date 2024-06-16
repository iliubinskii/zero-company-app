"use client";

import { AnimatedLink, MarketOverview } from "../components";
import type { FC, ReactNode } from "react";
import {
  GRAVATAR_DEFAULT,
  GRAVATAR_MP,
  GRAVATAR_RATING,
  GRAVATAR_SIZE,
  PLACEHOLDER_EMAIL
} from "../consts";
import {
  LuBookmark,
  LuFiles,
  LuHeartHandshake,
  LuLayoutDashboard,
  LuLogOut,
  LuSettings2,
  LuSprout
} from "react-icons/lu";
import { selectAuthUser, useAppSelector } from "../store";
import { API_URL } from "../config";
import React from "react";
import gravatar from "gravatar";
import { lang } from "../langs";
import tw from "tailwind-styled-components";
import { usePathname } from "next/navigation";
import { useUserName } from "../hooks";

/**
 * Profile layout.
 * @param props - The properties.
 * @param props.children - The children.
 * @param props.loading - The loading.
 * @returns The element.
 */
export const ProfileLayout: FC<Props> = ({ children, loading = false }) => {
  const authUser = useAppSelector(selectAuthUser);

  const name = useUserName();

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
            <UserName>{name}</UserName>
            <UserEmail>
              {authUser ? authUser.email : PLACEHOLDER_EMAIL}
            </UserEmail>
          </UserInfo>
        </User>
        <Links>
          {links.map(({ Icon, href, text }) => {
            const active =
              href === "/profile"
                ? pathname === href
                : pathname.startsWith(href);

            return (
              <AnimatedLink
                className={
                  active
                    ? "rounded px-5 py-3 flex items-center gap-4 text-slate-700 bg-slate-200"
                    : "rounded px-5 py-3 flex items-center gap-4 text-slate-700"
                }
                href={href}
                key={href}
              >
                <Icon className="text-2xl" />
                {text}
              </AnimatedLink>
            );
          })}
        </Links>
      </SideMenu>
      <Main>
        <Contents>{loading || children}</Contents>
        <Info>
          <MarketOverview />
        </Info>
      </Main>
    </Container>
  );
};

export interface Props {
  readonly children?: ReactNode | undefined;
  readonly loading?: boolean | undefined;
}

const Container = tw.div`p-6 flex gap-8`;

const SideMenu = tw.div`flex flex-col gap-5`;

const User = tw.div`h-16 w-64 flex items-center gap-3`;

const UserImage = tw.img`h-16 w-16 rounded-full border border-slate-200`;

const UserInfo = tw.div`flex flex-col gap-1 overflow-hidden`;

const UserName = tw.div`text-gray-700 font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap`;

const UserEmail = tw.div`text-sm text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap`;

const Links = tw.div`w-64 flex flex-col gap-1`;

const Main = tw.div`grow p-4 flex gap-9`;

const Contents = tw.div`grow flex flex-col gap-9`;

const Info = tw.div`hidden xl:block`;

const links = [
  {
    Icon: LuLayoutDashboard,
    href: "/profile",
    text: lang.Dashboard
  },
  {
    Icon: LuSprout,
    href: "/profile/companies",
    text: lang.MyCompanies
  },
  {
    Icon: LuHeartHandshake,
    href: "/profile/drafts",
    text: lang.MyDrafts
  },
  {
    Icon: LuFiles,
    href: "/profile/documents",
    text: lang.Documents
  },
  {
    Icon: LuSettings2,
    href: "/profile/settings",
    text: lang.Settings
  },
  {
    Icon: LuBookmark,
    href: "/profile/bookmarks",
    text: lang.Bookmarks
  },
  {
    Icon: LuLogOut,
    href: `${API_URL}auth/logout`,
    text: lang.LogOut
  }
];
