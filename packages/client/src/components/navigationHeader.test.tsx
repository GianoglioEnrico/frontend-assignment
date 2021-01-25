import React from "react";
import { render, screen } from "@testing-library/react";
import NavigationHeader from "./NavigationHeader";

describe("Navigation Header renders", () => {
  it("logo and subtitle", () => {
    render(<NavigationHeader />);
    const headerLogo = screen.getByTestId("header-logo");
    const headerSubtitle = screen.getByText(/Frontend-Assignment/i);
    expect(headerLogo).toBeInTheDocument();
    expect(headerSubtitle).toBeInTheDocument();
  });
});
