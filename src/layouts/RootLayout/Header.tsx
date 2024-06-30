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
import { Logo } from "./Logo";
import ProfileButton from "./ProfileButton";
import React, { useEffect, useRef, useState } from "react";
import { SiteSearchDesktop } from "./SiteSearchDesktop";
import { SiteSearchMobile } from "./SiteSearchMobile";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

export const Header: FC<Props> = ({ categories }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);

  const hamburgerRef = useRef<HTMLDivElement>(null);

  const closeMenu = (): void => {
    setIsMenuOpened(false);
  };

  useClickOutside(closeMenu, [], [menuRef, hamburgerRef]);

  useEscapePress(closeMenu, []);

  useEffect(() => {
    if (isMenuOpened) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
  }, [isMenuOpened]);

  return (
    <header>
      {/* Dark header */}
      <nav>
        <MainHeader>
          <GridContainer>
            <LinksContainer>
              <Hamburger
                isOpened={isMenuOpened}
                onClick={setIsMenuOpened}
                ref={hamburgerRef}
              />
              <ul className="gap-3 justify-start items-center hidden lg:flex">
                {mainLinks.map((el, ind) => (
                  <li key={ind}>
                    <HeaderSimpleButton>{el}</HeaderSimpleButton>
                  </li>
                ))}
              </ul>
            </LinksContainer>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <ButtonsContainer>
              <SiteSearchDesktop />
              <CreateCompanyButton />
              <ProfileButton />
            </ButtonsContainer>
          </GridContainer>
        </MainHeader>
        {/* Dark header END */}

        {/* App drawer */}
        <ul
          className={`
            flex flex-col gap-6 h-screen w-56 bg-charcoal
            bg-opacity-90 fixed top-0 text-white px-8 pb-8 pt-28 text-base z-20 
            transition-all ease-out duration-300
            lg:hidden ${isMenuOpened ? "left-0" : "-left-56"}
            `}
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
        <MobileSearchContainer>
          <SiteSearchMobile />
        </MobileSearchContainer>
        {/* Mobile site search END */}

        {/* Text Carousel */}
        <section className="border-b-1.5 py-4 px-2">
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
        </section>
        {/* Text Carousel END */}
      </nav>
    </header>
  );
};

export interface Props {
  readonly categories: readonly ExistingCategory[];
}

const mainLinks: string[] = [
  lang.Teams,
  lang.Resources,
  lang.Internships,
  lang.CoFounders
];

const MainHeader = tw.div`w-full bg-charcoal p-4`;

const GridContainer = tw.div`
  mx-auto max-w-screen-2xl 
  flex
  lg:grid 
  gap-4 items-center relative z-30
  lg:justify-between
  lg:grid-cols-header-grid-container
`;
const LinksContainer = tw.div`flex gap-5 items-center`;

const LogoContainer = tw.div`text-white`;

const ButtonsContainer = tw.div`flex justify-end items-center gap-5 sm:gap-3 xl:gap-4 flex-grow`;

const MobileSearchContainer = tw.div`px-4 pt-4 flex justify-center sm:hidden`;
