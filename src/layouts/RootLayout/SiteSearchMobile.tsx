import { IoClose, IoSearch } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

export const SiteSearchMobile: FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const searchParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get("q");

    if (query) setSearchInput(query);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (!searchInput) return;

    e.preventDefault();
    router.push(`/search?q=${searchInput}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <SearchIconContainer>
          <IoSearch className="w-6 h-6" />
        </SearchIconContainer>
        <SearchInput
          onChange={e => {
            setSearchInput(e.target.value);
          }}
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
    </form>
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
