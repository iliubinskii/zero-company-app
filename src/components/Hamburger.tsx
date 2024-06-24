"use client";

/* eslint-disable spellcheck/spell-checker -- Ok */

import React, { useEffect, useState } from "react";
import styles from "./Hamburger.module.css";

export const Hamburger: React.FC<Props> = ({ isOpened }) => {
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(isOpened);

  useEffect(() => {
    setIsHamburgerClicked(isOpened);
  }, [isOpened]);

  const stylesUnclicked = `${styles["hamburger-bar"]} ${styles["unclicked"]}`;

  const stylesClicked = `${styles["hamburger-bar"]} ${styles["clicked"]}`;

  return (
    <div
      className="h-5 w-7 flex justify-between items-start flex-col cursor-pointer lg:hidden"
      onClick={() => {
        setIsHamburgerClicked(!isHamburgerClicked);
      }}
    >
      <div className={isHamburgerClicked ? stylesClicked : stylesUnclicked} />
      <div className={isHamburgerClicked ? stylesClicked : stylesUnclicked} />
      <div className={isHamburgerClicked ? stylesClicked : stylesUnclicked} />
    </div>
  );
};

export interface Props {
  readonly isOpened: boolean;
}
