import type { FC, HTMLAttributes } from "react";
import { IoSearch } from "react-icons/io5";
import React from "react";
import { lang } from "../langs";

const SiteSearch: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => (
  <div className={`relative ${className}`.trim()} {...props}>
    <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-700" />
    <input
      className="w-full border border-gray-300 rounded-lg shadow-lg pl-12 pr-3 py-3"
      placeholder={lang.header.searchPlaceholder}
      type="search"
    />
  </div>
);

export default SiteSearch;
