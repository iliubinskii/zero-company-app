"use client";

import type { FC, ReactNode } from "react";
import { AnimatedLink } from "../../components";
import type { ExistingCategory } from "../../schema";
import Header from "./Header";
import Logo from "./Logo";
import React from "react";
import { lang } from "../../langs";

export const RootLayout: FC<Props> = ({ categories, children }) => (
  <div className="flex flex-col">
    <Header categories={categories} />
    <main>{children}</main>
    {/* Contents END */}

    <footer className="bg-light-gray-cold">
      {/* Footer categories */}
      <div className="border-t-1.5 border-gray-300">
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
      <div className="border-t-1.5 p-10">
        <div className="mx-auto max-w-screen-2xl grid grid-cols-4 gap-10 items-start">
          <div className="scale-75 text-charcoal">
            <Logo />
          </div>
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
      <div className="border-t-1.5">
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

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly children: ReactNode;
}

const footerLinkGroups = [
  {
    links: [
      { href: "/knowledge/about", text: lang.AboutUs },
      { href: "/knowledge/charter", text: lang.OurCharter },
      { href: "/knowledge/team", text: lang.Team },
      { href: "/knowledge/jobs", text: lang.Jobs }
    ],
    title: lang.About
  },
  {
    links: [
      { href: "/knowledge/how-it-works", text: lang.HowZeroCompanyWorks },
      { href: "/knowledge/nda", text: lang.NDA },
      { href: "/knowledge/ip", text: lang.IpAgreement },
      { href: "/knowledge/shareholders", text: lang.FoundingAgreement },
      { href: "/knowledge/buy-sell", text: lang.BuySellAgreement },
      { href: "/knowledge/drag-along", text: lang.DragAlongRights },
      { href: "/knowledge/tag-along", text: lang.TagAlongRights },
      { href: "/knowledge/preemptive", text: lang.PreemptiveRights },
      { href: "/knowledge/rofr", text: lang.ROFR }
    ],
    title: lang.Legal
  },
  {
    links: [
      { href: "/knowledge/questions", text: lang.CommonQuestions },
      { href: "/knowledge/help", text: lang.HelpCenter },
      { href: "/knowledge/blog", text: lang.Blog },
      { href: "/knowledge/success", text: lang.SuccessStories }
    ],
    title: lang.Resources
  }
] as const;

const footerLinks = [
  { href: "/knowledge/terms", text: lang.TermsOfUse },
  { href: "/knowledge/privacy", text: lang.PrivacyPolicy },
  { href: "/knowledge/cookie-policy", text: lang.CookiePolicy },
  {
    href: "/knowledge/accessibility-statement",
    text: lang.AccessibilityStatement
  }
] as const;
