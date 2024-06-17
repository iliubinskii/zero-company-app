import type { FC } from "react";
import { IoSearch } from "react-icons/io5";
import React from "react";
import { lang } from "../../langs";

const SiteSearch: FC = () => (
  <div className="relative w-full flex justify-end items-center">
    <IoSearch className="relative -mr-8 w-5 h-5 text-gray-700" />
    <input
      className="
        text-sm w-52 rounded-lg border-none pl-10 pr-3 py-2
        transition-all duration-300 outline-none
        focus:ring-transparent focus:w-full
      "
      placeholder={lang.layouts.RootLayout.SiteSearch.searchPlaceholder}
      type="search"
    />
  </div>
);

export default SiteSearch;
