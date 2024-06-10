import App from "../App";
import { render, screen, waitFor } from "@testing-library/react";

describe("register button", () => {
  it("should watch register button", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("register-modal")).toBeInTheDocument();
    });

    expect(screen.getByTestId("register-modal")).toBeInTheDocument();
  });
});