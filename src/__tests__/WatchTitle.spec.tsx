import App from "../App";
import { render, screen, waitFor } from "@testing-library/react";

describe("title", () => {
  it("should watch title", async() => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("title")).toBeInTheDocument();
    });

    expect(screen.getByTestId("title")).toBeInTheDocument();
  });
});