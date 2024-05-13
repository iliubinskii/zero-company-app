import Link from "next/link";
import React from "react";
import { lang } from "../langs";

const CreateCompanyButton: React.FC<
  Omit<React.ComponentProps<typeof Link>, "href">
> = ({ className, ...props }) => (
  <Link
    className={`px-4 py-3 rounded border border-gray-400 transition duration-150 ease-in-out hover:border-black focus:border-black ${className}`.trim()}
    {...props}
    href="/create-company"
  >
    {lang.CreateCompany}
  </Link>
);

export default CreateCompanyButton;
