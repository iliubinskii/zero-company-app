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
import styles from "./ProfileLayout.module.css";
import { usePathname } from "next/navigation";

export const ProfileLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className={styles["container"]}>
      <div className={styles["menu"]}>
        {links.map(({ Icon, href, text }) => (
          <AnimatedLink
            className={
              href === pathname ? styles["item-active"] : styles["item"]
            }
            href={href}
            key={href}
          >
            <Icon className={styles["icon"]} />
            {text}
          </AnimatedLink>
        ))}
      </div>
      <div className={styles["contents"]}>{children}</div>
    </div>
  );
};

export interface Props {
  readonly children: ReactNode;
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
