import type { ComponentProps, FC } from "react";
import { AnimatedLink } from "../components";
import { Bebas_Neue } from "next/font/google";
import type Link from "next/link";
import React from "react";
import { images } from "../images";
import { lang } from "../langs";

const Logo: FC<Omit<ComponentProps<typeof Link>, "href">> = ({
  className = "",
  ...props
}) => (
  <AnimatedLink
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
    <h1
      className={`${bebas.className} text-2xl sm:text-[2rem] text-blue-700 whitespace-nowrap`}
    >
      {lang.ZeroCompany}
    </h1>
  </AnimatedLink>
);

export default Logo;

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
