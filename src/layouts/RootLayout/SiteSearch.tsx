import { IoClose, IoSearch } from "react-icons/io5";
import type { FC } from "react";
import React, { useState } from "react";
import { lang } from "../../langs";

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO: I think you suggested to split it into two components

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO:
// Use `export const SiteSearch` instead of default export
// (to be consistent with other components in this project)
const SiteSearch: FC<Props> = ({ className, themeColor }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className={`${className} relative w-full flex items-center`}>
      <IoSearch
        className={`${searchIconStyles} ${themeColor === "light" ? "text-gray-700" : "text-white"}`}
      />
      <input
        className={`${inputStyles} ${themeColor === "light" ? lightThemeInputStyles : darkThemeInputStyles}`}
        onChange={e => {
          setSearchInput(e.target.value);
        }}
        placeholder={lang.layouts.RootLayout.SiteSearch.searchPlaceholder}
        type="search"
        value={searchInput}
      />
      {searchInput && (
        <IoClose
          className={`${closeIconStyles} ${themeColor === "light" ? "text-gray-700" : "text-white hover:text-gray-300"}`}
          onClick={() => {
            setSearchInput("");
          }}
        />
      )}
    </div>
  );
};

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO:
// Use tw styled components instead of `...Styles` variables
// Also use tw styled components for container div
// When you need to break string into several lines, use template literals

const inputStyles =
  "border rounded-lg pl-8 pr-3 py-3 text-base  " +
  "focus:outline-none focus:ring-2 focus:ring-transparent focus:w-full xl:pl-12 xl:py-3 sm:w-48 md:w-80 lg:w-48 ";

const darkThemeInputStyles =
  "border-white placeholder-white  text-white bg-transparent focus:border-white " +
  "transition-all duration-300 ";

const lightThemeInputStyles = "border-gray-400 w-full focus:border-gray-400";

const searchIconStyles =
  "z-10 mt-[2px] -mr-7 w-5 h-5 xl:-mr-10 xl:mt-1 xl:w-6 xl:h-6 ";

const closeIconStyles = "z-10 mt-[2px] -ml-7 w-6 h-6 cursor-pointer ";

export default SiteSearch;

export interface Props {
  readonly className?: string | undefined;
  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Restrict type to "dark" | "light"
  readonly themeColor?: string | undefined;
}
