import { Bebas_Neue, Roboto } from "next/font/google";
import { GetCategoriesResponse } from "../schema";
import { IoSearch } from "react-icons/io5";
import ProfileButton from "./ProfileButton";
import React from "react";
import { images } from "../images";
import { lang } from "../langs";

const Layout: React.FC<Props> = ({ categories, children }) => {
  return (
    <div className={roboto.className}>
      <div className="flex flex-col">
        {/* Header */}
        <div className="border-b-1.5 p-5 flex flex-col gap-5">
          {/* Main header */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a className="flex items-center gap-2" href="/">
              <img
                alt={lang.ZeroCompany}
                className="app-logo-image"
                height={images.appLogo.height}
                src={images.appLogo.src}
                width={images.appLogo.width}
              />
              <h1 className={`${bebas.className} app-logo-text text-blue-700`}>
                {lang.ZeroCompany}
              </h1>
            </a>
            {/* Logo END */}

            {/* Site search */}
            <div className="relative flex-grow">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-700" />
              <input
                className="w-full border border-gray-300 rounded-lg shadow-lg pl-12 pr-3 py-3"
                placeholder={lang.header.searchPlaceholder}
                type="search"
              />
            </div>
            {/* Site search END */}

            {/* Create company */}
            <a
              className="px-4 py-3 rounded border border-gray-400 transition duration-150 ease-in-out hover:border-black focus:border-black"
              href="/create-company"
            >
              {lang.CreateCompany}
            </a>
            {/* Create company END */}

            {/* Profile */}
            <ProfileButton />
            {/* Profile END */}
          </div>
          {/* Main header END */}

          {/* Categories */}
          <div className="flex justify-center gap-4 font-medium">
            {categories.docs.map(category => (
              <a href={`/categories/${category._id}`} key={category._id}>
                {category.name}
              </a>
            ))}
          </div>
          {/* Categories END */}
        </div>
        {/* Header END */}

        {/* Contents */}
        <div className="m-9">
          <div className="max-w-screen-lg mx-auto">{children}</div>
        </div>
        {/* Contents END */}
      </div>
    </div>
  );
};

export default Layout;

export interface Props {
  readonly categories: GetCategoriesResponse;
  readonly children: React.ReactNode;
}

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
