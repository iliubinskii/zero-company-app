"use client";

import {
  AnimatedLink,
  Hamburger,
  HeaderSimpleButton,
  TextCarousel
} from "../../components";
import { useClickOutside, useEscapePress } from "../../hooks";
import CreateCompanyButton from "./CreateCompanyButton";
import type { ExistingCategory } from "../../schema";
import type { FC } from "react";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import React, { useEffect, useRef, useState } from "react";
import SiteSearch from "./SiteSearch";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

const Header: FC<Props> = ({ categories }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);

  const hamburgerRef = useRef<HTMLDivElement>(null);

  const closeMenu = (): void => {
    setIsMenuOpened(false);
  };

  useClickOutside([menuRef, hamburgerRef], closeMenu);

  useEscapePress(closeMenu);

  useEffect(() => {
    if (isMenuOpened) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
  }, [isMenuOpened]);

  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Use tw styled components

  return (
    <header>
      {/* Dark header */}
      <HeaderMainLinksContainer>
        <div
          className="mx-auto max-w-screen-2xl grid grid-cols-header-grid-container-lg gap-4 items-center relative z-30
             lg:justify-between lg:grid-cols-header-grid-container"
        >
          <div className="flex gap-5 items-center">
            <div
              onClick={() => {
                setIsMenuOpened(!isMenuOpened);
              }}
              ref={hamburgerRef}
            >
              <Hamburger isOpened={isMenuOpened} />
            </div>
            <ul className="gap-3 justify-start items-center hidden lg:flex">
              {mainLinks.map((el, ind) => (
                <li key={ind}>
                  <HeaderSimpleButton>{el}</HeaderSimpleButton>
                </li>
              ))}
            </ul>
            <div className="text-white lg:hidden">
              <Logo />
            </div>
          </div>
          <div className="text-white hidden lg:block">
            <Logo />
          </div>
          <div className="flex justify-end items-center gap-5 sm:gap-3 xl:gap-4">
            <SiteSearch className="hidden sm:flex justify-end" />
            <CreateCompanyButton />
            <ProfileButton />
          </div>
        </div>
      </HeaderMainLinksContainer>
      {/* Dark header END */}

      {/* App drawer */}
      {/* eslint-disable-next-line no-warning-comments -- Assigned */}
      {/*
        TODO:
        Using fixed 600px value will cause delay before menu starts appearing
        Maybe use same fixed size for drawer width and for left property
        Or measure drawer width (in this case use `opacity-0 pointer-events-none` for hidden menu)
      */}
      <ul
        className={`${smallMenu} ${isMenuOpened ? "left-0" : "-left-[600px]"}`}
        ref={menuRef}
      >
        {mainLinks.map((el, ind) => (
          <li
            key={ind}
            onClick={() => {
              setIsMenuOpened(!isMenuOpened);
            }}
          >
            <HeaderSimpleButton>{el}</HeaderSimpleButton>
          </li>
        ))}
      </ul>
      {/* App drawer END */}

      {/* Mobile site search */}
      <div className="px-4 pt-4 sm:hidden">
        <SiteSearch className="pl-2" themeColor="light" />
      </div>
      {/* Mobile site search END */}

      {/* Text Carousel */}
      <div className="border-b-1.5 py-4 px-2">
        <TextCarousel>
          <ul className="font-medium flex gap-4 whitespace-nowrap mx-auto">
            {categories.map(category => (
              <li key={category._id}>
                <AnimatedLink href={`/categories/${category._id}`}>
                  {category.name}
                </AnimatedLink>
              </li>
            ))}
          </ul>
        </TextCarousel>
      </div>
      {/* Text Carousel END */}
    </header>
  );
};

export default Header;

export interface Props {
  readonly categories: readonly ExistingCategory[];
}

const mainLinks: string[] = [
  lang.Teams,
  lang.Resources,
  lang.Internships,
  lang.CoFounders
];

const smallMenu =
  "flex flex-col gap-6 h-screen w-56 bg-charcoal " +
  "bg-opacity-90 fixed top-0 text-white " +
  "px-8 pb-8 pt-28 text-base z-20 transition-left ease-out duration-500 lg:hidden";

const HeaderMainLinksContainer = tw.div`w-full bg-charcoal p-4`;
