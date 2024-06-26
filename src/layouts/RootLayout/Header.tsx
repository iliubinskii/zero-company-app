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
import { SiteSearchDarkTheme } from "./SiteSearchDarkTheme";
import { SiteSearchLightTheme } from "./SiteSearchLightTheme";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

const Header: FC<Props> = ({ categories }) => {
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
      <MainHeader>
        <MainHeaderGridContainer>
          <LinksContainer>
            <Hamburger
              isOpened={isMenuOpened}
              onClick={setIsMenuOpened}
              ref={hamburgerRef}
            />
            <LinksList>
              {mainLinks.map((el, ind) => (
                <li key={ind}>
                  <HeaderSimpleButton>{el}</HeaderSimpleButton>
                </li>
              ))}
            </LinksList>
            <LogoContainerSmallScreen>
              <Logo />
            </LogoContainerSmallScreen>
          </LinksContainer>
          <LogoContainerWideScreen>
            <Logo />
          </LogoContainerWideScreen>
          <RightLinksContainer>
            <SiteSearchDarkTheme />
            <CreateCompanyButton />
            <ProfileButton />
          </RightLinksContainer>
        </MainHeaderGridContainer>
      </MainHeader>
      {/* Dark header END */}

      {/* App drawer */}
      <AppDrawer className={isMenuOpened ? "left-0" : "-left-56"} ref={menuRef}>
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
      </AppDrawer>
      {/* App drawer END */}

      {/* Mobile site search */}
      <MobileSiteSearchContainer>
        <SiteSearchLightTheme />
      </MobileSiteSearchContainer>
      {/* Mobile site search END */}

      {/* Text Carousel */}
      <TextCarouselContainer>
        <TextCarousel>
          <TextCarouselList>
            {categories.map(category => (
              <li key={category._id}>
                <AnimatedLink href={`/categories/${category._id}`}>
                  {category.name}
                </AnimatedLink>
              </li>
            ))}
          </TextCarouselList>
        </TextCarousel>
      </TextCarouselContainer>
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

const MainHeader = tw.div`w-full bg-charcoal p-4`;

const MainHeaderGridContainer = tw.div`
  mx-auto max-w-screen-2xl grid grid-cols-header-grid-container-lg
  gap-4 items-center relative z-30
  lg:justify-between
  lg:grid-cols-header-grid-container
`;

const LinksContainer = tw.div`flex gap-5 items-center`;

const LinksList = tw.ul`gap-3 justify-start items-center hidden lg:flex`;

const LogoContainerSmallScreen = tw.div`text-white lg:hidden`;

const LogoContainerWideScreen = tw.div`text-white hidden lg:block`;

const RightLinksContainer = tw.div`flex justify-end items-center gap-5 sm:gap-3 xl:gap-4`;

const AppDrawer = tw.ul`
  flex flex-col gap-6 h-screen w-56 bg-charcoal
  bg-opacity-90 fixed top-0 text-white px-8 pb-8 pt-28 text-base z-20 transition-all ease-out duration-300
  lg:hidden
`;

const MobileSiteSearchContainer = tw.div`px-4 pt-4 flex justify-center sm:hidden`;

const TextCarouselContainer = tw.div`border-b-1.5 py-4 px-2`;

const TextCarouselList = tw.ul`font-medium flex gap-4 whitespace-nowrap mx-auto`;
