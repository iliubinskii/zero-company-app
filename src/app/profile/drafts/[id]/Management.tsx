import type { FC } from "react";
import type { ModuleProps } from "./helpers";
import React from "react";
import { lang } from "../../../../langs";

export const Management: FC<ModuleProps> = () => (
  <form className="flex flex-col gap-11">
    {/* Submit button */}
    <div className="flex justify-end">
      <button className="primary-button" type="submit">
        {lang.Save}
      </button>
    </div>
    {/* Submit button END */}
  </form>
);
