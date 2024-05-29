"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const Navigate: React.FC<Props> = ({ to }) => {
  const router = useRouter();

  React.useEffect(() => {
    router.push(to);
  }, [to, router]);

  return <></>;
};

export interface Props {
  readonly to: string;
}
