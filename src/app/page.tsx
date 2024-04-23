import { API_URL } from "../config";
import Image from "next/image";
import React from "react";

/**
 * Home page component.
 * @returns The rendered component.
 */
export default async function Home() {
  const response = await fetch(API_URL);

  const json = await response.json();

  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-3">
      <Image src="/next.svg" alt="Next Logo" width={100} height={24} priority />
      <pre>{JSON.stringify(json)}</pre>
    </div>
  );
}
