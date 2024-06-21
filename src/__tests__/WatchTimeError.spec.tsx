import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

describe("time error", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  //   // 他の初期化処理
  // });

  it("No time input", async() => {
    render(<App/>);

    await waitFor(() => {
      expect(screen.getByTestId("register-modal")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("register-modal"));
    fireEvent.change(screen.getByTestId("content-input"),{target:{value:"test"},});
    fireEvent.click(screen.getByTestId("register-button"));

    await waitFor(() => {
    const TimeMessage = screen.getByTestId("time-error");
    expect(TimeMessage).toHaveTextContent("学習時間を入力してください")
    });
  });

  it("time is less than 1", async() => {
    render(<App/>);

    await waitFor(() => {
      expect(screen.getByTestId("register-modal")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("register-modal"));
    fireEvent.change(screen.getByTestId("content-input"),{target:{value:"test"},});
    fireEvent.change(screen.getByTestId("time-input"),{target:{value:0},});
    fireEvent.click(screen.getByTestId("register-button"));

    await waitFor(() => {
    const TimeMessage = screen.getByTestId("time-error");
    expect(TimeMessage).toHaveTextContent("時間は1以上である必要があります")
    });
  });
});
