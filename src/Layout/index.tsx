import type { ExistingCategory, MultipleDocsResponse } from "../schema";
import type { FC, ReactNode } from "react";
import { AnimatedLink } from "../components";
import { CategoriesCarousel } from "./CategoriesCarousel";
import CreateCompanyButton from "./CreateCompanyButton";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import React from "react";
import SiteSearch from "./SiteSearch";
import { lang } from "../langs";

const Layout: FC<Props> = ({ categories, children }) => (
  <div className="flex flex-col">
    <header>
      <div className="border-b-1.5">
        <div className="mx-auto max-w-screen-2xl p-5 flex flex-col gap-5">
          {/* Search bar */}
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            <Logo />
            <SiteSearch className="hidden md:block grow" />
            <div className="flex items-center gap-2 lg:gap-4">
              <CreateCompanyButton />
              <ProfileButton />
            </div>
          </div>
          <SiteSearch className="md:hidden" />
          {/* Search bar END */}

          {/* Categories */}
          <CategoriesCarousel categories={categories} />
          {/* Categories END */}
        </div>
      </div>
    </header>

    {/* Contents */}
    <main>{children}</main>
    {/* Contents END */}

    <footer>
      {/* Footer categories */}
      <div className="border-t-2 border-gray-400">
        <div className="mx-auto max-w-screen-2xl px-12 py-5 flex gap-4 text-sm">
          {categories.docs.map(category => (
            <AnimatedLink
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
          <Logo className="scale-75" />
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

export default Layout;

export interface Props {
  readonly categories: MultipleDocsResponse<ExistingCategory>;
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
      { href: "/shareholders", text: lang.ShareholdersAgreement },
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
