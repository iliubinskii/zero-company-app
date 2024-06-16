import { ArticleLayout } from "../../../layouts";
import { MemberCard } from "../../../components/MemberCard";
import type { NextPage } from "next";
import React from "react";
import { members } from "../../../members";

const Page: NextPage = () => (
  <ArticleLayout size="2xl">
    <div className="mx-auto max-w-screen-md">
      <div className="text-center text-4xl font-bold my-8">TEAM</div>
      <div className="text-lg leading-relaxed mb-8">
        <p className="text-xl font-semibold italic text-justify">
          We are a group of passionate and dedicated professionals who have come
          together with a common vision: to create an innovative platform that
          empowers startup founders to bring their projects to life. With a
          diverse range of expertise, from full-stack development and project
          management to quality assurance and user interface design, each member
          contributes their unique skills to ensure the success of our product.
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center item-center gap-16 pb-8">
      {members.map(member => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  </ArticleLayout>
);

export default Page;
