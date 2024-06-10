import { render, screen } from '@testing-library/react';
import App from '../App';
import { GetAllStudyRecords } from '../lib/study-record';
// import { act } from 'react';

// Supabaseのデータ取得関数をモック化
jest.mock('../lib/study-record', () => ({
  GetAllStudyRecords: jest.fn(),
}));

describe("App", () => {
  it("should render loading message", async () => {
    // モックが解決する前にレンダリングされることをシミュレート
    (GetAllStudyRecords as jest.Mock).mockResolvedValueOnce([]);

      render(<App />);

    // Loadingメッセージが表示されることを確認
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});