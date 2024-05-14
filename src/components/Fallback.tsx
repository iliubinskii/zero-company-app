import React from "react";
import { lang } from "../langs";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Style this
export const Fallback: React.FC = () => (
  <div className="mx-auto p-12">
    <div className="w-96 h-20 border border-blue-400 p-16 bg-blue-100 flex justify-center items-center text-blue-700">
      {lang.Loading}
    </div>
  </div>
);
