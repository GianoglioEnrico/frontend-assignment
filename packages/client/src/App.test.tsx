import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("renders learn react link", () => {
  xit("App container", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
