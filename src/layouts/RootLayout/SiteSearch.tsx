import type { FC } from "react";
import { IoSearch } from "react-icons/io5";
import React from "react";
import { lang } from "../../langs";

const SiteSearch: FC = () => (
  <div className="relative w-full flex justify-end">
    <IoSearch className="z-10 mt-3 -mr-10 w-6 h-6 text-gray-700" />
    <input
      className="w-52 rounded-lg border-none pl-12 pr-3 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-transparent focus:w-full"
      placeholder={lang.layouts.RootLayout.SiteSearch.searchPlaceholder}
      type="search"
    />
  </div>
);

export default SiteSearch;
