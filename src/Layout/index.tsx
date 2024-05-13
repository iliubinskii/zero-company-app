import { ExistingCategory, MultipleDocsResponse } from "../schema";
import CreateCompanyButton from "./CreateCompanyButton";
import Link from "next/link";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import React from "react";
import SiteSearch from "./SiteSearch";
import { lang } from "../langs";

const Layout: React.FC<Props> = ({ categories, children }) => {
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
        { href: "/legal", text: lang.LegalFoundation },
        { href: "/questions", text: lang.CommonQuestions },
        { href: "/success", text: lang.SuccessStories }
      ],
      title: lang.LearnMore
    },
    {
      links: [
        { href: "/help", text: lang.HelpCenter },
        { href: "/blog", text: lang.Blog }
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

  return (
    <div className="flex flex-col font-sans">
      <div className="border-b-1.5 p-5 flex flex-col gap-5">
        {/* Search bar */}
        <div className="flex items-center gap-8">
          <Logo />
          <SiteSearch className="flex-grow" />
          <CreateCompanyButton />
          <ProfileButton />
        </div>
        {/* Search bar END */}

        {/* Categories */}
        <div className="flex justify-center gap-4 font-medium">
          {categories.docs.map(category => (
            <Link href={`/categories/${category._id}`} key={category._id}>
              {category.name}
            </Link>
          ))}
        </div>
        {/* Categories END */}
      </div>

      {/* Contents */}
      <div className="m-9">
        <div className="max-w-screen-lg mx-auto">{children}</div>
      </div>
      {/* Contents END */}

      {/* Footer categories */}
      <div className="border-t-2 border-gray-400 px-12 py-5 flex gap-4 text-sm">
        {categories.docs.map(category => (
          <Link href={`/categories/${category._id}`} key={category._id}>
            {category.name}
          </Link>
        ))}
      </div>
      {/* Footer categories END */}

      {/* Footer link groups */}
      <div className="border-t-2 p-10">
        <div className="grid grid-cols-4 gap-10 items-start">
          <Logo className="scale-75" />
          {footerLinkGroups.map(({ links, title }, key) => (
            <div className="flex flex-col gap-4" key={key}>
              <h3 className="uppercase font-bold">{title}</h3>
              <div className="flex flex-col gap-1 text-sm text-gray-700">
                {links.map(({ href, text }) => (
                  <Link href={href} key={href}>
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer link groups END */}

      {/* Footer links */}
      <div className="border-t-2 p-7 flex justify-center gap-10 text-sm text-gray-700">
        {footerLinks.map(({ href, text }) => (
          <Link href={href} key={href}>
            {text}
          </Link>
        ))}
      </div>
      {/* Footer links END */}
    </div>
  );
};

export default Layout;

export interface Props {
  readonly categories: MultipleDocsResponse<ExistingCategory>;
  readonly children: React.ReactNode;
}
