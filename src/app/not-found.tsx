import { NotFound } from "../components";
import React from "react";
import { createPage } from "../utils";

const Page = createPage("/not-found", () => <NotFound />);

export default Page;
