"use client";

import {
  AnimatedLink,
  HeaderSimpleButton,
  TextCarousel
} from "../../components";
import CreateCompanyButton from "./CreateCompanyButton";
import type { ExistingCategory } from "../../schema";
import type { FC } from "react";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SiteSearch from "./SiteSearch";
import { lang } from "../../langs";
import styles from "./styles.module.css";

/* eslint-disable spellcheck/spell-checker -- Ok */

const Header: FC<Props> = ({ categories }) => {
  const [burgerClass, setBurgerClass] = useState(
    `${styles["hamburger-bar"]} ${styles["unclicked"]}`
  );
  const [menuClass, setMenuClass] = useState(`${styles["menu"]} `);

  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);

  const updateMenu = (): void => {
    if (isMenuClicked) {
      setBurgerClass(`${styles["hamburger-bar"]} ${styles["unclicked"]}`);
      setMenuClass(`${styles["menu"]} `);
    } else {
      setBurgerClass(`${styles["hamburger-bar"]} ${styles["clicked"]}`);
      setMenuClass(`${styles["menu"]}  ${styles["clicked"]}`);
    }
    setIsMenuClicked(prevState => !prevState);
  };
  const closeMenu = useCallback((): void => {
    setBurgerClass(`${styles["hamburger-bar"]} ${styles["unclicked"]}`);
    setMenuClass(`${styles["menu"]}`);
    setIsMenuClicked(false);
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      const target = event.target;
      if (
        menuRef.current &&
        target instanceof Node &&
        !menuRef.current.contains(target)
      )
        closeMenu();
    },
    [closeMenu]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu]);
  return (
    <header>
      {/* Dark header */}
      <div className="w-full bg-charcoal p-4">
        <div
          className="mx-auto max-w-screen-2xl grid grid-cols-header-grid-container-lg gap-4 items-center relative z-30
             lg:justify-between lg:grid-cols-header-grid-container"
        >
          <div className="flex gap-5">
            <ul className="flex gap-2 justify-start items-center">
              <li
                className="h-5 w-7 flex justify-between items-start flex-col cursor-pointer lg:hidden"
                onClick={updateMenu}
              >
                <div className={burgerClass} />
                <div className={burgerClass} />
                <div className={burgerClass} />
              </li>
              <li className={styles["small-screen-hidden"]}>
                <HeaderSimpleButton>{lang.Teams}</HeaderSimpleButton>
              </li>
              <li className={styles["small-screen-hidden"]}>
                <HeaderSimpleButton>{lang.Resources}</HeaderSimpleButton>
              </li>
              <li className={styles["small-screen-hidden"]}>
                <HeaderSimpleButton>{lang.Internships}</HeaderSimpleButton>
              </li>
              <li className={styles["small-screen-hidden"]}>
                <HeaderSimpleButton>{lang.CoFounders}</HeaderSimpleButton>
              </li>
            </ul>
            <div className="text-white lg:hidden">
              <Logo />
            </div>
          </div>
          <div className="text-white hidden lg:block">
            <Logo />
          </div>
          <div className="flex justify-end items-center gap-2 xl:gap-4">
            <SiteSearch className="hidden sm:flex justify-end" />
            <CreateCompanyButton />
            <ProfileButton />
          </div>
        </div>
      </div>
      <ul className={menuClass} ref={menuRef}>
        <li onClick={closeMenu}>
          <HeaderSimpleButton>{lang.Teams}</HeaderSimpleButton>
        </li>
        <li onClick={closeMenu}>
          <HeaderSimpleButton>{lang.Resources}</HeaderSimpleButton>
        </li>
        <li onClick={closeMenu}>
          <HeaderSimpleButton>{lang.Internships}</HeaderSimpleButton>
        </li>
        <li onClick={closeMenu}>
          <HeaderSimpleButton>{lang.CoFounders}</HeaderSimpleButton>
        </li>
      </ul>
      {/* Dark header END */}
      <div className="px-4 pt-4 sm:hidden">
        <SiteSearch className="border rounded-lg pl-2" />
      </div>
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
