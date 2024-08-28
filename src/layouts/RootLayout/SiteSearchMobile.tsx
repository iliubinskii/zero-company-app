import { IoClose, IoSearch } from "react-icons/io5";
import type { FC } from "react";
import React, { useState } from "react";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";
import { useRouter } from "next/navigation.js";

export const SiteSearchMobile: FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") router.push(`/search?q=${searchInput}`);
  };

  return (
    <Container>
      <SearchIconContainer>
        <IoSearch className="w-6 h-6" />
      </SearchIconContainer>
      <SearchInput
        onChange={e => {
          setSearchInput(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={lang.layouts.RootLayout.SiteSearch.searchPlaceholder}
        type="search"
        value={searchInput}
      />
      {searchInput && (
        <CloseIconContainer
          onClick={() => {
            setSearchInput("");
          }}
        >
          <IoClose className="w-6 h-6" />
        </CloseIconContainer>
      )}
    </Container>
  );
};

const Container = tw.div`relative w-full flex items-center `;

const SearchIconContainer = tw.div`absolute text-gray-700 z-10 mt-[2px] left-2.5`;

const CloseIconContainer = tw.div`absolute z-10 mt-[2px] right-2.5 cursor-pointer text-gray-700`;

const SearchInput = tw.input`
  border rounded-lg pl-10 pr-3 py-3 text-base focus:outline-none
  border-gray-400 w-full focus:border-gray-400
  focus:ring-2 focus:ring-transparent focus:w-full
  xl:pl-12 xl:py-3 sm:w-48 md:w-80 lg:w-48
`;
