import { BlocksLayout, Loading } from "../../../components";

import React from "react";
import { createPage } from "../../../utils";
import { lang } from "../../../langs";

const Page = createPage("/create-company", () => (
  <BlocksLayout>
    <div className="py-24 flex flex-col items-center gap-3">
      <Loading />
      <div className="text-gray-700">{lang.MakingThingsDone}</div>
    </div>
  </BlocksLayout>
));

export default Page;
