import { render, screen } from "@testing-library/react";
import Page from "./page";
import React from "react";
import { lang } from "../../../langs";

describe("Terms page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const alert = screen.queryByText(lang.Loading);

    const title = screen.queryByText(lang.TermsOfUse);

    expect(alert).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
