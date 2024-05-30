import type { FC } from "react";
import React from "react";
import { lang } from "../langs";

// eslint-disable-next-line no-warning-comments -- Ok
// TODO: Style it
export const Unauthorized: FC = () => (
  <div className="mx-auto p-12">
    <div className="w-96 h-20 border border-red-400 p-16 bg-red-100 flex justify-center items-center text-red-700">
      {lang.Unauthorized}
    </div>
  </div>
);
