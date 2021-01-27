import React from "react";
import { render, screen } from "@testing-library/react";
import PageTitle from ".";

describe("Page Title renders", () => {
  it("main title and minor title", () => {
    render(<PageTitle />);
    const mainTitle = screen.getByTestId("main-title");
    const minorTitle = screen.getByTestId("minor-title");
    expect(mainTitle).toBeInTheDocument();
    expect(minorTitle).toBeInTheDocument();
  });
});
