import { Bebas_Neue, Roboto } from "next/font/google";
import { ExistingCategories } from "../schema";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import React from "react";
import { images } from "../images";
import { lang } from "../langs";

export interface Props {
  readonly categories: ExistingCategories;
  readonly children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ categories, children }) => {
  return (
    <div className={roboto.className}>
      <div className="flex flex-col">
        {/* Header */}
        <div className="border-b-1.5 p-5 flex flex-col gap-5">
          {/* Main header */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image
                alt={lang.ZeroCompany}
                className="app-logo-image"
                height={images.appLogo.height}
                priority
                src={images.appLogo.src}
                width={images.appLogo.width}
              />
              <h1 className={`${bebas.className} app-logo-text text-blue-700`}>
                {lang.ZeroCompany}
              </h1>
            </div>
            {/* Logo END */}

            {/* Site search */}
            <div className="relative flex-grow">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-700" />
              <input
                className="w-full border border-gray-300 rounded-lg shadow-lg pl-12 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={lang.header.searchPlaceholder}
                type="search"
              />
            </div>
            {/* Site search END */}

            {/* Create company */}
            <button className="px-4 py-3 rounded border border-gray-400 transition duration-150 ease-in-out hover:border-black focus:border-black">
              {lang.CreateCompany}
            </button>
            {/* Create company END */}

            {/* Log in */}
            <button className="px-2 py-3 transition-colors duration-150 hover:text-green-800">
              {lang.LogIn}
            </button>
            {/* Log in END */}
          </div>
          {/* Main header END */}

          {/* Categories */}
          <div className="flex justify-center gap-4 font-medium">
            {categories.map(category => (
              <a href={`/categories/${category.id}`} key={category.id}>
                {category.name}
              </a>
            ))}
          </div>
          {/* Categories END */}
        </div>
        {/* Header END */}

        {/* Contents */}
        {children}
        {/* Contents END */}
      </div>
    </div>
  );
};

export default Layout;

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
