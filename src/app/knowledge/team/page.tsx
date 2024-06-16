import { ArticleLayout } from "../../../layouts";
import { MemberCard } from "../../../components/MemberCard";
import type { NextPage } from "next";
import React from "react";
import { members } from "../../../members";

const Page: NextPage = () => (
  <div className="">
    <ArticleLayout>
      <div className="text-center text-4xl font-bold my-8">OUR TEAM</div>
      <div className="text-lg leading-relaxed mb-8">
        <p className="text-xl font-semibold italic text-justify">
          Our team is a group of passionate and dedicated professionals who have
          come together with a common vision: to create an innovative platform
          that empowers startup founders to bring their projects to life. With a
          diverse range of expertise, from full-stack development and project
          management to quality assurance and user interface design, each member
          contributes their unique skills to ensure the success of our product.
        </p>
      </div>
    </ArticleLayout>
    <div className="flex flex-wrap justify-center item-center px-12">
      {members.map(member => (
        <div className="p-4 md:w-full xl:w-1/2" key={member.id}>
          <MemberCard member={member} />
        </div>
      ))}
    </div>
  </div>
);

export default Page;
