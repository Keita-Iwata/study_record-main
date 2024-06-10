import App from "../App";
import { render, screen, waitFor } from "@testing-library/react";

describe("table", () => {
  it("should watch table", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("table")).toBeInTheDocument();
    });

    expect(screen.getByTestId("table")).toBeInTheDocument();
  });
});