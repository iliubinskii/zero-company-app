"use client";

import type { FC } from "react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Navigate: FC<Props> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to, router]);

  return <></>;
};

export interface Props {
  readonly to: string;
}
