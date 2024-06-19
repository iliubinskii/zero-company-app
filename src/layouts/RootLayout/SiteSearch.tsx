import type { FC } from "react";
import { IoSearch } from "react-icons/io5";
import React from "react";
import { lang } from "../../langs";

const SiteSearch: FC<Props> = ({ className }) => (
  <div className={`${className} relative w-full flex items-center`}>
    <IoSearch className="z-10 mt-[2px] -mr-7 w-5 h-5 text-gray-700 xl:-mr-10 xl:mt-1 xl:w-6 xl:h-6 " />
    <input
      className="rounded-lg border-none pl-8 pr-3 py-2 text-sm
      transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-transparent focus:w-full
      sm:w-52
      md:w-80
      lg:w-52
      xl:pl-12 xl:py-3 xl:text-base"
      placeholder={lang.layouts.RootLayout.SiteSearch.searchPlaceholder}
      type="search"
    />
  </div>
);

export default SiteSearch;

export interface Props {
  readonly className?: string;
}
