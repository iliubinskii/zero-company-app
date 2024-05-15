import { render, screen } from "@testing-library/react";
import Page from "./terms";
import React from "react";
import { lang } from "../langs";

const useRouter = jest.fn();

jest.mock("next/router", () => {
  return { useRouter: () => useRouter() as unknown };
});

describe("Terms page", () => {
  it("renders a heading", () => {
    useRouter.mockImplementationOnce(() => {
      return { isFallback: false };
    });

    render(<Page />);

    const alert = screen.queryByText(lang.Loading);

    const title = screen.queryByText(lang.TermsOfUse);

    expect(alert).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it("renders a fallback", () => {
    useRouter.mockImplementationOnce(() => {
      return { isFallback: true };
    });

    render(<Page />);

    const alert = screen.queryByText(lang.Loading);

    const title = screen.queryByText(lang.TermsOfUse);

    expect(alert).toBeInTheDocument();
    expect(title).not.toBeInTheDocument();
  });
});
