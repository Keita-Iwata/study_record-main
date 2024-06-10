import App from "../App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("modal header", () => {
  it("should watch modal header", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("register-modal")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("register-modal"));
    const modalTitle = screen.getByTestId("modal-header");

    expect(modalTitle).toHaveTextContent("新規登録");
  });
});