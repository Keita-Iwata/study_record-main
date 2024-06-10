import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

test("check no content error", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByTestId("table")).toBeInTheDocument();
  });

  // 操作前にリストアイテムの数を取得

  const initialItems = screen.getAllByTestId("study-item");
  const initialItemCount = initialItems.length;
  console.log(initialItemCount);

  // ユーザー操作をシミュレート（ToDo項目の追加）
  fireEvent.click(screen.getByTestId("register-modal"));
  fireEvent.change(screen.getByTestId("time-input"), {
    target: { value: "1" },
  });
  fireEvent.click(screen.getByTestId("register-button"));

  await waitFor(() => {
    const noContentMessage = screen.getByTestId("no-content-error");
    expect(noContentMessage).toHaveTextContent("学習内容を記載してください")
  });
});
