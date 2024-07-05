import type { FC } from "react";
import React from "react";
import tw from "tailwind-styled-components";
export const BlogCard: FC<Props> = ({
  button_text,
  header,
  img_url,
  link,
  text
}) => (
  <ArticleContainer>
    <ImgContainer className="w-28 h-28 md:w-48 md:h-48 flex-shrink-0">
      <img
        alt="random photo"
        className="w-full h-full object-cover"
        src={img_url}
      />
    </ImgContainer>
    <Content>
      <a className="block" href={link}>
        <h3 className="text-base md:text-xl hover:underline underline-offset-2 text-gray-700">
          {header}
        </h3>
        <p className="text-sm pt-4 text-gray-700">{text}</p>
      </a>
      <button
        className="pt-4 text-sm text-gray-700 hover:underline underline-offset-2"
        type="button"
      >
        {button_text}
      </button>
    </Content>
  </ArticleContainer>
);

const ArticleContainer = tw.article`
  flex pb-10 md:p-5 gap-5 justify-between border-b 
  border-gray-200 last:border-b-0 md:border md:last:border-b
`;

const ImgContainer = tw.div`w-28 h-28 md:w-48 md:h-48 flex-shrink-0`;

const Content = tw.div`flex flex-col items-start justify-between lg:h-full`;

export interface Props {
  readonly button_text: string;
  readonly header: string;
  readonly id: string;
  readonly img_url: string;
  readonly link: string;
  readonly text: string;
}
