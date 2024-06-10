"use client";

import {
  AnimatedLink,
  HeaderSimpleButton,
  TextCarousel
} from "../../components";
import type { FC, ReactNode } from "react";
import CreateCompanyButton from "./CreateCompanyButton";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import React from "react";
import SiteSearch from "./SiteSearch";
import { lang } from "../../langs";
import { usePinnedCategories } from "../../contexts";

export const RootLayout: FC<Props> = ({ children }) => {
  const categories = usePinnedCategories();

  return (
    <div className="flex flex-col">
      {/* Header /*/}
      <header>
        {/* Dark header */}
        <div className="w-full bg-charcoal p-5 ">
          <div className="mx-auto max-w-screen-2xl grid grid-cols-header-grid-container gap-4 items-center">
            <ul className="flex gap-3 justify-start">
              <li>
                <HeaderSimpleButton>Teams</HeaderSimpleButton>
              </li>
              <li>
                <HeaderSimpleButton>Internships</HeaderSimpleButton>
              </li>
              <li>
                <HeaderSimpleButton>Join as co-founder</HeaderSimpleButton>
              </li>
            </ul>
            <Logo className="text-white" />
            <div className="flex items-center gap-4 justify-end">
              <SiteSearch />
              <CreateCompanyButton />
              <ProfileButton />
            </div>
          </div>
        </div>
        {/* Dark header END */}

        {/* Text Carousel */}
        <div className="border-b-1.5 py-4">
          <TextCarousel>
            <ul className="font-medium flex gap-4 whitespace-nowrap mx-auto">
              {categories.map(category => (
                <li key={category._id}>
                  <AnimatedLink href={`/categories/${category._id}`}>
                    {category.name}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </TextCarousel>
        </div>
        {/* Text Carousel END */}
      </header>
      {/* Header END */}

      {/* Contents */}
      <main>{children}</main>
      {/* Contents END */}

      <footer className="bg-light-gray-cold">
        {/* Footer categories */}
        <div className="border-t-2 border-gray-400">
          <div className="mx-auto max-w-screen-2xl px-12 py-5 flex flex-col md:flex-row flex-wrap gap-x-3 gap-y-1 text-sm">
            <h3 className="uppercase font-semibold mb-3 md:hidden">
              {lang.Explore}
            </h3>
            {categories.map(category => (
              <AnimatedLink
                className="inline-block whitespace-nowrap"
                href={`/categories/${category._id}`}
                key={category._id}
              >
                {category.name}
              </AnimatedLink>
            ))}
          </div>
        </div>
        {/* Footer categories END */}

        {/* Footer link groups */}
        <div className="border-t-2 p-10">
          <div className="mx-auto max-w-screen-2xl grid grid-cols-4 gap-10 items-start">
            <Logo className="scale-75 text-charcoal" />
            {footerLinkGroups.map(({ links, title }, key) => (
              <div className="flex flex-col gap-4" key={key}>
                <h3 className="uppercase font-bold">{title}</h3>
                <div className="flex flex-col gap-1 text-sm text-gray-700">
                  {links.map(({ href, text }) => (
                    <AnimatedLink href={href} key={href}>
                      {text}
                    </AnimatedLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer link groups END */}

        {/* Footer links */}
        <div className="border-t-2">
          <div className="mx-auto max-w-screen-2xl p-7 flex justify-center gap-10 text-sm text-gray-700">
            {footerLinks.map(({ href, text }) => (
              <AnimatedLink href={href} key={href}>
                {text}
              </AnimatedLink>
            ))}
          </div>
        </div>
        {/* Footer links END */}
      </footer>
    </div>
  );
};

export interface Props {
  readonly children: ReactNode;
}

const footerLinkGroups = [
  {
    links: [
      { href: "/about", text: lang.AboutUs },
      { href: "/charter", text: lang.OurCharter },
      { href: "/team", text: lang.Team },
      { href: "/jobs", text: lang.Jobs }
    ],
    title: lang.About
  },
  {
    links: [
      { href: "/how-it-works", text: lang.HowZeroCompanyWorks },
      { href: "/nda", text: lang.NDA },
      { href: "/ip", text: lang.IpAgreement },
      { href: "/shareholders", text: lang.FoundingAgreement },
      { href: "/buy-sell", text: lang.BuySellAgreement },
      { href: "/drag-along", text: lang.DragAlongRights },
      { href: "/tag-along", text: lang.TagAlongRights },
      { href: "/preemptive", text: lang.PreemptiveRights },
      { href: "/rofr", text: lang.ROFR }
    ],
    title: lang.Legal
  },
  {
    links: [
      { href: "/questions", text: lang.CommonQuestions },
      { href: "/help", text: lang.HelpCenter },
      { href: "/blog", text: lang.Blog },
      { href: "/success", text: lang.SuccessStories }
    ],
    title: lang.Resources
  }
] as const;

const footerLinks = [
  { href: "/terms", text: lang.TermsOfUse },
  { href: "/privacy", text: lang.PrivacyPolicy },
  { href: "/cookie-policy", text: lang.CookiePolicy },
  { href: "/accessibility-statement", text: lang.AccessibilityStatement }
] as const;
