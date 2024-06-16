import type { FC } from "react";
import React from "react";

export const BlogCard: FC<Props> = ({
  button_text,
  header,
  img_url,
  link,
  text
}) => (
  <div className="flex p-5 gap-5 border-[1px] border-gray-300 justify-between">
    <div className="w-48 h-48 flex-shrink-0">
      <img
        alt="random photo"
        className="w-full h-full object-cover"
        src={img_url}
      />
    </div>
    <div className="flex flex-col items-start justify-between">
      <a className="block" href={link}>
        <h3 className="text-xl hover:underline underline-offset-2 text-gray-700">
          {header}
        </h3>
        <p className="text-sm pt-4 text-gray-700">{text}</p>
      </a>
      <button
        className="pt-6 text-sm text-gray-700 hover:underline underline-offset-2"
        type="button"
      >
        {button_text}
      </button>
    </div>
  </div>
);

export interface Props {
  readonly button_text: string;
  readonly header: string;
  readonly id: string;
  readonly img_url: string;
  readonly link: string;
  readonly text: string;
}
