"use client";

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO: Add exclusion in .eslintrc.cjs instead
/* eslint-disable spellcheck/spell-checker -- Ok */

import React, { useEffect, useState } from "react";
import styles from "./Hamburger.module.css";

export const Hamburger: React.FC<Props> = ({ isOpened }) => {
  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Remove
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(isOpened);

  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Remove
  useEffect(() => {
    setIsHamburgerClicked(isOpened);
  }, [isOpened]);

  const stylesUnclicked = `${styles["hamburger-bar"]} ${styles["unclicked"]}`;

  const stylesClicked = `${styles["hamburger-bar"]} ${styles["clicked"]}`;

  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Used tw styled compnent (`Container`)
  return (
    <div
      className="h-5 w-7 flex justify-between items-start flex-col cursor-pointer lg:hidden"
      onClick={() => {
        // eslint-disable-next-line no-warning-comments -- Assigned
        // TODO: Add `onClick: (opened: boolean) => void` to props instead
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
