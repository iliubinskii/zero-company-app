import { Bebas_Neue } from "next/font/google";
import Link from "next/link";
import React from "react";
import { images } from "../images";
import { lang } from "../langs";

const Logo: React.FC<Omit<React.ComponentProps<typeof Link>, "href">> = ({
  className = "",
  ...props
}) => (
  <Link
    className={`flex items-center gap-2 ${className}`.trim()}
    href="/"
    {...props}
  >
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
  </Link>
);

export default Logo;

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
