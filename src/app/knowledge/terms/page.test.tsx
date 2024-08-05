import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import React from "react";
import { lang } from "../../../langs";

describe("Terms page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const title = screen.queryByText(lang.TermsOfUse);

    expect(title).toBeInTheDocument();
  });
});
