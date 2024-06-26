import React, { forwardRef } from "react";
import styles from "./Hamburger.module.css";
import tw from "tailwind-styled-components";

export const Hamburger = forwardRef<HTMLDivElement, Props>(function Hamburger(
  { isOpened, onClick },
  ref
) {
  const stylesUnclicked = `${styles["hamburger-bar"]} ${styles["unclicked"]}`;

  const stylesClicked = `${styles["hamburger-bar"]} ${styles["clicked"]}`;

  return (
    <HamburgerContainer
      onClick={() => {
        onClick(!isOpened);
      }}
      ref={ref}
    >
      <div className={isOpened ? stylesClicked : stylesUnclicked} />
      <div className={isOpened ? stylesClicked : stylesUnclicked} />
      <div className={isOpened ? stylesClicked : stylesUnclicked} />
    </HamburgerContainer>
  );
});

export interface Props {
  readonly isOpened: boolean;
  readonly onClick: (opened: boolean) => void;
}

const HamburgerContainer = tw.div`h-5 w-7 flex justify-between items-start flex-col cursor-pointer lg:hidden`;
