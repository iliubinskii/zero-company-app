import type { FC } from "react";
import React from "react";
import { lang } from "../../../langs";
import tw from "tailwind-styled-components";

export const NoBookmarkedCompanies: FC = () => (
  <Container>
    <Icon>
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7v12a2 2 0 002 2h14a2 2 0 002-2V7m-5 4h.01M12 11h.01M9 16h6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </Icon>
    <Title>{lang.app.profile.bookmarks.NoBookmarks.title}</Title>
    <Text>{lang.app.profile.bookmarks.NoBookmarks.text}</Text>
    <Button>{lang.app.profile.bookmarks.NoBookmarks.button}</Button>
  </Container>
);

const Container = tw.div`
  h-full rounded-lg bg-gray-100 shadow-md p-6
  flex flex-col justify-center items-center
`;

const Icon = tw.div`w-16 h-16 mb-4 text-gray-400`;

const Title = tw.h2`mb-2 text-xl font-semibold text-gray-700`;

const Text = tw.p`mb-4 text-gray-500`;

const Button = tw.button`px-4 py-2 primary-button`;
